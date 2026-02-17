import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Select, TextField } from '@radix-ui/themes'
import type { Resolver } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'

import type { Product, ProductCategory } from '@/entities/product'
import { FormField } from '@/shared/ui'

import type { EditProductFormValues } from '../model'
import { editProductSchema } from '../model'
import { prepareDefaultValues } from '../model/defaultValues'

function getError(err: unknown): string | undefined {
  if (err === undefined || err === null) {
    return undefined
  }
  if (typeof err === 'string') {
    return err
  }
  if (typeof err === 'object' && err !== null && 'message' in err) {
    return (err as { message?: string }).message
  }
  return undefined
}

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
    resolver: zodResolver(editProductSchema) as Resolver<EditProductFormValues>,
    defaultValues: prepareDefaultValues(product),
    mode: 'onTouched',
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
      <FormField label="Title" error={getError(errors.title)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField.Root placeholder="Product title" size="2" {...field} />
          )}
        />
      </FormField>

      <FormField label="Category" error={getError(errors.category)}>
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
                placeholder="Select category"
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
      </FormField>

      <FormField label="Price" error={getError(errors.price)}>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField.Root
              type="number"
              placeholder="0"
              size="2"
              {...field}
            />
          )}
        />
      </FormField>

      <FormField label="Stock" error={getError(errors.stock)}>
        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <TextField.Root
              type="number"
              placeholder="0"
              size="2"
              {...field}
            />
          )}
        />
      </FormField>
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
