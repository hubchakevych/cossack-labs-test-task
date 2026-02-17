import { Dialog, Flex, Spinner } from '@radix-ui/themes'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import type { Product } from '@/entities/product'
import { useGetCategories } from '@/entities/product'
import { prepareProductFormValues } from '@/entities/product'
import type { ProductFormValues } from '@/shared/lib/product-form'
import { ProductForm } from '@/shared/ui/ProductForm'

type EditProductDialogProps = {
  product: Product
  onSave: (productId: number, values: ProductFormValues) => void | Promise<void>
  trigger: React.ReactNode
}

const EditProductDialogInner = ({
  product,
  onSave,
  trigger,
}: EditProductDialogProps) => {
  const [open, setOpen] = useState(false)
  const { categories, categoriesLoading } = useGetCategories(open)

  const showLoader = categoriesLoading || (open && categories.length === 0)

  const handleSubmit = (values: ProductFormValues) => {
    void Promise.resolve(onSave(product.id, values))
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit product</Dialog.Title>
        <Dialog.Description size="2">
          Update the product details below.
        </Dialog.Description>
        {showLoader ? (
          <Flex justify="center" align="center" py="8">
            <Spinner size="3" />
          </Flex>
        ) : (
          <ProductForm
            defaultValues={prepareProductFormValues(product)}
            categories={categories}
            categoriesLoading={categoriesLoading}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            submitLabel="Save"
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export const EditProductDialog = observer(EditProductDialogInner)
