import { zodResolver } from '@hookform/resolvers/zod'
import * as Label from '@radix-ui/react-label'
import { Box, Button, Flex, Select, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'

import type { Product, ProductCategory } from '@/entities/product'

import type { EditProductFormValues } from '../model'
import { editProductSchema } from '../model'
import { prepareDefaultValues } from '../model/defaultValues'

type EditProductFormProps = {
  product: Product
  categories: ProductCategory[]
  categoriesLoading: boolean
  onSave: (productId: number, values: EditProductFormValues) => void | Promise<void>
  onCancel: () => void
}

export const EditProductForm = ({
  product,
  categories,
  categoriesLoading,
  onSave,
  onCancel,
}: EditProductFormProps) => {
  const form = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductSchema),
    defaultValues: prepareDefaultValues(product),
  })

  const { control, handleSubmit, formState: { errors, isDirty } } = form

  const onSubmit = (data: EditProductFormValues) => {
    void Promise.resolve(onSave(product.id, data))
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className="mt-4 space-y-4"
    >
      <Box>
        <Label.Root className="block text-sm font-medium mb-1.5">
          Title
        </Label.Root>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField.Root placeholder="Product title" size="2" {...field} />
          )}
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </Box>
      <Box>
        <Label.Root className="block text-sm font-medium mb-1.5">
          Category
        </Label.Root>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select.Root
              value={field.value}
              onValueChange={field.onChange}
              disabled={categoriesLoading}
              size="2"
            >
              <Select.Trigger
                placeholder={categoriesLoading ? 'Loading…' : 'Select category'}
                className="w-full"
              />
              <Select.Content
                position="popper"
                className="max-h-[240px] overflow-y-auto"
              >
                {categories.map((cat) => (
                  <Select.Item key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
        {errors.category && (
          <span className="text-red-500 text-sm">
            {errors.category.message}
          </span>
        )}
      </Box>
      <Box>
        <Label.Root className="block text-sm font-medium mb-1.5">
          Price
        </Label.Root>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField.Root
              type="number"
              placeholder="0"
              size="2"
              {...field}
              onChange={(e) => field.onChange(e.target.valueAsNumber ?? 0)}
            />
          )}
        />
        {errors.price && (
          <span className="text-red-500 text-sm">{errors.price.message}</span>
        )}
      </Box>
      <Box>
        <Label.Root className="block text-sm font-medium mb-1.5">
          Stock
        </Label.Root>
        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <TextField.Root
              type="number"
              placeholder="0"
              size="2"
              {...field}
              onChange={(e) => field.onChange(e.target.valueAsNumber ?? 0)}
            />
          )}
        />
        {errors.stock && (
          <span className="text-red-500 text-sm">{errors.stock.message}</span>
        )}
      </Box>
      <Flex gap="3" justify="end" mt="4">
        <Button type="button" variant="soft" color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isDirty}>
          Save
        </Button>
      </Flex>
    </form>
  )
}
