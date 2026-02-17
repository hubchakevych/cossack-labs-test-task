import {
  Box,
  Flex,
  Spinner,
  Table,
  Text,
} from '@radix-ui/themes'

import type { Product } from '@/entities/product'

type ProductsTableProps = {
  products: Product[]
  loading: boolean
  error: string | null
  renderRowActions?: (product: Product) => React.ReactNode
}

export const ProductsTable = ({
  products,
  loading,
  error,
  renderRowActions,
}: ProductsTableProps) => {

  if (loading) {
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
      <Table.Root className="h-full min-h-0 w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Stock</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Rating</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id} className="group">
              <Table.Cell>{product.title}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>${product.price.toFixed(2)}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell>{product.rating}</Table.Cell>
              <Table.Cell>
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
