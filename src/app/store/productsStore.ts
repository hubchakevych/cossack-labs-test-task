import { makeAutoObservable, runInAction } from 'mobx'

import { productApi } from '@/entities/product/api/products'
import type {
  Product,
  ProductCategory,
  ProductsTableQueryParams,
} from '@/entities/product/model/types'
import { parseBackendError } from '@/shared/lib/parseBackendError'

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
      if (category) {
        const response = await productApi.getByCategory({ ...params, category })
        const products = searchTerm
          ? response.data.products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          : response.data.products

        this.setSuccess(products, response.data.total)
        return
      }

      if (searchTerm) {
        const response = await productApi.search({ ...params, searchTerm })
        this.setSuccess(response.data.products, response.data.total)
        return
      }

      const response = await productApi.getAll(params)
      this.setSuccess(response.data.products, response.data.total)
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

  private setSuccess = (products: Product[], total: number): void => {
    this.products = products
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
