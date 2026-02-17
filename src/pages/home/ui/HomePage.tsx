import { Button, Flex, Heading } from '@radix-ui/themes'
import { observer } from 'mobx-react-lite'

import { DeleteProductDialog } from '@/features/delete-product'
import { EditProductDialog } from '@/features/edit-product'
import { ProductsTable } from '@/widgets/products-table'

import { useGetProducts } from '../model'

const HomePageInner = () => {
  const { products, loading, error } = useGetProducts()

  return (
    <Flex direction="column" className="h-full min-h-0 overflow-hidden">
      <Heading size="5" mb="4">
        Products
      </Heading>
      <ProductsTable
        products={products}
        loading={loading}
        error={error}
        renderRowActions={(product) => (
          <>
            <EditProductDialog
              product={product}
              onSave={() => undefined}
              trigger={<Button variant="outline">Edit</Button>}
            />
            <DeleteProductDialog
              productName={product.title}
              onConfirm={() => undefined}
              trigger={
                <Button color="red" variant="soft">
                  Delete
                </Button>
              }
            />
          </>
        )}
      />
    </Flex>
  )
}

const HomePage = observer(HomePageInner)
export { HomePage }
