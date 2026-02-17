import { Product } from '@/entities/product'

export const prepareDefaultValues = (product: Product) => {
  return {
    title: product.title ?? '',
    category: product.category ?? [],
    price: product.price ?? 0,
    stock: product.stock ?? 0,
  }
}
