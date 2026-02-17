import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Select, TextField } from '@radix-ui/themes'
import type { Resolver } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'

import type { ProductCategory } from '@/entities/product'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import type { ProductFormValues } from '@/shared/lib/product-form'
import { productFormSchema } from '@/shared/lib/product-form'
import { FormField } from '@/shared/ui/FormField'

type ProductFormProps = {
  defaultValues: ProductFormValues
  categories: ProductCategory[]
  categoriesLoading: boolean
  onSubmit: (values: ProductFormValues) => void | Promise<void>
  onCancel: () => void
  submitLabel: string
}

export const ProductForm = ({
  defaultValues,
  categories,
  categoriesLoading,
  onSubmit,
  onCancel,
  submitLabel,
}: ProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormValues>,
    defaultValues,
    mode: 'onTouched',
  })

  const { control, handleSubmit, formState: { errors, isDirty } } = form

  const handleFormSubmit = (data: ProductFormValues) => {
    void Promise.resolve(onSubmit(data))
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
      className="mt-4 space-y-4"
    >
      <FormField label="Title" error={getErrorMessage(errors.title)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField.Root placeholder="Product title" size="2" {...field} />
          )}
        />
      </FormField>

      <FormField label="Category" error={getErrorMessage(errors.category)}>
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

      <FormField label="Price" error={getErrorMessage(errors.price)}>
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

      <FormField label="Stock" error={getErrorMessage(errors.stock)}>
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
          {submitLabel}
        </Button>
      </Flex>
    </form>
  )
}
