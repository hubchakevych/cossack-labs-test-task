import { makeAutoObservable } from 'mobx'

import { productApi } from '@/entities/product'
import type { Product } from '@/entities/product'
import { parseBackendError } from '@/shared/lib/parseBackendError'

export class ProductsStore {
  products: Product[] = []
  total = 0
  loading = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  fetchProducts = async (params?: { limit?: number; skip?: number }): Promise<void> => {
    this.loading = true
    this.error = null

    try {
      const { data } = await productApi.getAll(params)
      this.products = data.products
      this.total = data.total
    } catch (err) {
      this.error = parseBackendError(err)
      this.products = []
    } finally {
      this.loading = false
    }
  }
}

export const productsStore = new ProductsStore()
