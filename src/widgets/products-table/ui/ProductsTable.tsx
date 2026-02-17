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

import { PRODUCTS_TABLE_COLUMN_WIDTH } from './constants'

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
              className={PRODUCTS_TABLE_COLUMN_WIDTH.title}
              activeSortField={sortBy}
              sortOrder={order}
              onSortChange={onSortChange}
            />
            <Table.ColumnHeaderCell className={PRODUCTS_TABLE_COLUMN_WIDTH.category}>
              Category
            </Table.ColumnHeaderCell>
            <SortableHeaderCell
              label="Price"
              field="price"
              className={PRODUCTS_TABLE_COLUMN_WIDTH.numeric}
              activeSortField={sortBy}
              sortOrder={order}
              onSortChange={onSortChange}
            />
            <SortableHeaderCell
              label="Stock"
              field="stock"
              className={PRODUCTS_TABLE_COLUMN_WIDTH.numeric}
              activeSortField={sortBy}
              sortOrder={order}
              onSortChange={onSortChange}
            />
            <SortableHeaderCell
              label="Rating"
              field="rating"
              className={PRODUCTS_TABLE_COLUMN_WIDTH.numeric}
              activeSortField={sortBy}
              sortOrder={order}
              onSortChange={onSortChange}
            />
            <Table.ColumnHeaderCell className={PRODUCTS_TABLE_COLUMN_WIDTH.actions} />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id} className="group">
              <Table.Cell className={`${PRODUCTS_TABLE_COLUMN_WIDTH.title} truncate`}>
                {product.title}
              </Table.Cell>
              <Table.Cell className={`${PRODUCTS_TABLE_COLUMN_WIDTH.category} truncate`}>
                {product.category}
              </Table.Cell>
              <Table.Cell className={PRODUCTS_TABLE_COLUMN_WIDTH.numeric}>
                ${product.price.toFixed(2)}
              </Table.Cell>
              <Table.Cell className={PRODUCTS_TABLE_COLUMN_WIDTH.numeric}>
                {product.stock}
              </Table.Cell>
              <Table.Cell className={PRODUCTS_TABLE_COLUMN_WIDTH.numeric}>
                {product.rating}
              </Table.Cell>
              <Table.Cell className={PRODUCTS_TABLE_COLUMN_WIDTH.actions}>
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
