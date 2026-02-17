import { Product } from '@/entities/product'

export const defaultValues = {
  title: '',
  category: '',
  price: 0,
  stock: 0,
}

export const prepareDefaultValues = (product: Product) => {
  return {
    title: product.title,
    category: product.category,
    price: product.price,
    stock: product.stock,
  }
}
