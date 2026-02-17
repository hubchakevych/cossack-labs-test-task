import { Dialog, Flex, Spinner } from '@radix-ui/themes'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { useGetCategories } from '@/app/model/useGetCategories'
import type { ProductFormValues } from '@/shared/lib/product-form'
import { getEmptyProductFormValues } from '@/shared/lib/product-form'
import { ProductForm } from '@/shared/ui/ProductForm'

type AddProductDialogProps = {
  onSave: (values: ProductFormValues) => void | Promise<void>
  trigger: React.ReactNode
}

const AddProductDialogInner = ({ onSave, trigger }: AddProductDialogProps) => {
  const [open, setOpen] = useState(false)
  const { categories, categoriesLoading } = useGetCategories(open)

  const showLoader = categoriesLoading || (open && categories.length === 0)

  const handleSubmit = (values: ProductFormValues) => {
    void Promise.resolve(onSave(values))
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add product</Dialog.Title>
        <Dialog.Description size="2">
          Fill in the details to add a new product.
        </Dialog.Description>
        {showLoader ? (
          <Flex justify="center" align="center" py="8">
            <Spinner size="3" />
          </Flex>
        ) : (
          <ProductForm
            defaultValues={getEmptyProductFormValues()}
            categories={categories}
            categoriesLoading={categoriesLoading}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            submitLabel="Create"
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export const AddProductDialog = observer(AddProductDialogInner)
