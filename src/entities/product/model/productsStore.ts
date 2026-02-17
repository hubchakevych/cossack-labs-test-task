import { makeAutoObservable, runInAction } from 'mobx'

import { parseBackendError } from '@/shared/lib'

import { productApi } from '../api/products'
import type {
  Product,
  ProductCategory,
  ProductsTableQueryParams,
} from './types'

export class ProductsStore {
  products: Product[] = []
  total = 0
  loading = false
  error: string | null = null

  categories: ProductCategory[] = []
  categoriesLoading = false

  constructor() {
    makeAutoObservable(this, {
      getProducts: false,
      getCategories: false,
    })
  }

  getProducts = async ({
    searchTerm,
    category,
    sortBy,
    order,
    take,
    skip,
  }: ProductsTableQueryParams): Promise<void> => {
    this.startLoading()
    try {
      const params = { limit: take, skip, sortBy, order }
      const shouldAppend = skip > 0

      if (category && searchTerm) {
        const response = await productApi.getByCategory({
          ...params,
          category,
          limit: 0,
          skip: 0,
        })
        const filteredProducts = response.data.products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        const paginatedProducts = filteredProducts.slice(skip, skip + take)
        this.setSuccess(paginatedProducts, filteredProducts.length, shouldAppend)
        return
      }

      if (category) {
        const response = await productApi.getByCategory({ ...params, category })
        this.setSuccess(response.data.products, response.data.total, shouldAppend)
        return
      }

      if (searchTerm) {
        const response = await productApi.search({ ...params, searchTerm })
        this.setSuccess(response.data.products, response.data.total, shouldAppend)
        return
      }

      const response = await productApi.getAll(params)
      this.setSuccess(response.data.products, response.data.total, shouldAppend)
    } catch (err) {
      this.setFailure(parseBackendError(err))
    }
  }

  getCategories = async (): Promise<void> => {
    if (this.categories.length > 0) {
      return
    }

    this.categoriesLoading = true
    try {
      const { data } = await productApi.getCategories()
      runInAction(() => {
        this.categories = data
        this.categoriesLoading = false
      })
    } catch {
      runInAction(() => {
        this.categories = []
        this.categoriesLoading = false
      })
    }
  }

  private startLoading = (): void => {
    this.loading = true
    this.error = null
  }

  private setSuccess = (products: Product[], total: number, shouldAppend = false): void => {
    this.products = shouldAppend
      ? [...this.products, ...products]
      : products
    this.total = total
    this.loading = false
  }

  private setFailure = (message: string): void => {
    this.error = message
    this.products = []
    this.loading = false
  }
}

export const productsStore = new ProductsStore()
