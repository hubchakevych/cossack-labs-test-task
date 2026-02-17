import type { ProductFormValues } from '@/shared/lib/product-form'

import type { Product } from './types'

export const prepareProductFormValues = (product: Product): ProductFormValues => ({
  title: product.title ?? '',
  category: product.category ?? '',
  price: product.price ?? 0,
  stock: product.stock ?? 0,
})
