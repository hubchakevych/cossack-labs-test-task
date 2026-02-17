import { z } from 'zod/v4'

const requiredNumber = (msg: string) =>
  z
    .union([z.string(), z.number()])
    .refine((val) => val !== '' && val !== undefined && !Number.isNaN(Number(val)), {
      message: msg,
    })
    .transform(Number)

export const editProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  price: requiredNumber('Price is required').pipe(
    z.number().min(0, 'Price must be 0 or more'),
  ),
  stock: requiredNumber('Stock is required').pipe(
    z.number().int().min(0, 'Stock must be 0 or more'),
  ),
})

export type EditProductFormValues = z.infer<typeof editProductSchema>
