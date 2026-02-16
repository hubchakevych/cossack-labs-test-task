import { makeAutoObservable } from 'mobx'

import type { Product } from '@/entities/product'
import { productApi } from '@/entities/product'
import { parseBackendError } from '@/shared/lib/parseBackendError'

export class ProductsStore {
  products: Product[] = []
  total = 0
  loading = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this, {
      getProducts: false,
    })
  }

  getProducts = async ({ limit, skip }: { limit: number; skip: number }): Promise<void> => {
    this.startLoading()
    try {
      const { data } = await productApi.getAll({ limit, skip })
      this.setSuccess(data.products, data.total)
    } catch (err) {
      this.setFailure(parseBackendError(err))
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
