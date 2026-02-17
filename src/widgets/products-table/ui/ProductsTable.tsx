import {
  Box,
  Flex,
  Spinner,
  Table,
  Text,
} from '@radix-ui/themes'

import type {
  Product,
  ProductSortBy,
  SortOrder,
} from '@/entities/product/model/types'
import { SortableHeaderCell } from '@/shared/ui'

type ProductsTableProps = {
  products: Product[]
  loading: boolean
  error: string | null
  sortBy?: ProductSortBy
  order?: SortOrder
  onSortChange?: (field: ProductSortBy) => void
  renderRowActions?: (product: Product) => React.ReactNode
}

export const ProductsTable = ({
  products,
  loading,
  error,
  sortBy,
  order,
  onSortChange,
  renderRowActions,
}: ProductsTableProps) => {

  if (loading && products.length === 0) {
    return <Spinner size="3" />
  }

  if (error) {
    return <Text color="red">{error}</Text>
  }

  if(products.length === 0) {
    return <Text color="gray">No products found</Text>
  }

  return (
    <Box className="w-full shrink-0 flex-1 h-0">
      <Table.Root className="h-full min-h-0 w-full table-fixed">
        <Table.Header>
          <Table.Row>
            <SortableHeaderCell
              label="Title"
              field="title"
              className="w-[320px]"
              activeSortField={sortBy}
              sortOrder={order}
              onSortChange={onSortChange}
            />
            <Table.ColumnHeaderCell className="w-[220px]">
              Category
            </Table.ColumnHeaderCell>
            <SortableHeaderCell
              label="Price"
              field="price"
              className="w-[120px]"
              activeSortField={sortBy}
              sortOrder={order}
              onSortChange={onSortChange}
            />
            <SortableHeaderCell
              label="Stock"
              field="stock"
              className="w-[120px]"
              activeSortField={sortBy}
              sortOrder={order}
              onSortChange={onSortChange}
            />
            <SortableHeaderCell
              label="Rating"
              field="rating"
              className="w-[120px]"
              activeSortField={sortBy}
              sortOrder={order}
              onSortChange={onSortChange}
            />
            <Table.ColumnHeaderCell className="w-[180px]" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id} className="group">
              <Table.Cell className="w-[320px] truncate">
                {product.title}
              </Table.Cell>
              <Table.Cell className="w-[220px] truncate">
                {product.category}
              </Table.Cell>
              <Table.Cell className="w-[120px]">
                ${product.price.toFixed(2)}
              </Table.Cell>
              <Table.Cell className="w-[120px]">
                {product.stock}
              </Table.Cell>
              <Table.Cell className="w-[120px]">
                {product.rating}
              </Table.Cell>
              <Table.Cell className="w-[180px]">
                {renderRowActions ? (
                  <Flex
                    gap="2"
                    justify="end"
                    className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  >
                    {renderRowActions(product)}
                  </Flex>
                ) : null}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
