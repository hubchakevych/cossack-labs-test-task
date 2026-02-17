import { z } from 'zod/v4'

export const editProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be 0 or more'),
  stock: z.number().int().min(0, 'Stock must be 0 or more'),
})

export type EditProductFormValues = z.infer<typeof editProductSchema>
