import type { ProductFormValues } from './schema'

export const getEmptyProductFormValues = (): ProductFormValues => ({
  title: '',
  category: '',
  price: 0,
  stock: 0,
})
