import {
  AlertDialog,
  Button,
  Flex,
} from '@radix-ui/themes'

type DeleteProductDialogProps = {
  productName: string
  onConfirm: () => void | Promise<void>
  trigger: React.ReactNode
}

export const DeleteProductDialog = ({
  productName,
  onConfirm,
  trigger,
}: DeleteProductDialogProps) => {
  const handleConfirm = () => {
    void Promise.resolve(onConfirm())
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete product</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete &quot;{productName}&quot;? This action
          cannot be undone.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" variant="solid" onClick={handleConfirm}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
