import {
  ChevronDownIcon,
  Pencil2Icon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { Button, Flex, Heading } from '@radix-ui/themes'
import { observer } from 'mobx-react-lite'

import { useGetCategories } from '@/entities/product'
import { AddProductDialog } from '@/features/add-product'
import { DeleteProductDialog } from '@/features/delete-product'
import { EditProductDialog } from '@/features/edit-product'
import { ProductsCategoryFilter } from '@/features/products-category-filter'
import { ProductsSearch } from '@/features/products-search'
import { ProductsTable } from '@/widgets/products-table'

import { useGetProducts } from '../model'

const HomePageInner = () => {
  const {
    products,
    loading,
    error,
    params,
    hasMore,
    updateFilters,
    updateSort,
    loadMore,
  } = useGetProducts()
  const { categories } = useGetCategories(true)

  return (
    <Flex direction="column" className="h-full min-h-0 overflow-hidden">
      <Flex justify="between" align="center" mb="4" gap="4">
        <Heading size="5">Products</Heading>
        <AddProductDialog
          onSave={(_values) => {
            void _values
          }}
          trigger={(
            <Button>
              <PlusIcon width={16} height={16} />
              Add product
            </Button>
          )}
        />
      </Flex>

      <Flex gap="3" mb="4" wrap="wrap">
        <ProductsSearch
          value={params.searchTerm || ''}
          onChange={(searchTerm) => {
            updateFilters({ searchTerm: searchTerm || undefined })
          }}
        />
        <ProductsCategoryFilter
          value={params.category || ''}
          categories={categories}
          onChange={(category) => {
            updateFilters({ category: category || undefined })
          }}
        />
      </Flex>

      <ProductsTable
        products={products}
        loading={loading}
        error={error}
        sortBy={params.sortBy}
        order={params.order}
        onSortChange={updateSort}
        renderRowActions={(product) => (
          <>
            <EditProductDialog
              product={product}
              onSave={() => undefined}
              trigger={(
                <Button variant="outline">
                  <Pencil2Icon width={14} height={14} />
                  Edit
                </Button>
              )}
            />
            <DeleteProductDialog
              productName={product.title}
              onConfirm={() => undefined}
              trigger={
                <Button color="red" variant="soft">
                  <TrashIcon width={14} height={14} />
                  Delete
                </Button>
              }
            />
          </>
        )}
      />
      {hasMore ? (
        <Flex justify="center" mt="4">
          <Button variant="outline" onClick={loadMore} disabled={loading}>
            {!loading && <ChevronDownIcon width={14} height={14} />}
            {loading ? 'Loading...' : 'Show more'}
          </Button>
        </Flex>
      ) : null}
    </Flex>
  )
}

const HomePage = observer(HomePageInner)
export { HomePage }
