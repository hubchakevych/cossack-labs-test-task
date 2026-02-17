import { Dialog, Flex, Spinner } from '@radix-ui/themes'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import type { Product } from '@/entities/product'

import type { EditProductFormValues } from '../model'
import { useGetCategories } from '../model/useGetCategories'
import { EditProductForm } from './EditProductForm'

type EditProductDialogProps = {
  product: Product
  onSave: (productId: number, values: EditProductFormValues) => void | Promise<void>
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
          <EditProductForm
            product={product}
            categories={categories}
            categoriesLoading={categoriesLoading}
            onSave={onSave}
            onCancel={() => setOpen(false)}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export const EditProductDialog = observer(EditProductDialogInner)
