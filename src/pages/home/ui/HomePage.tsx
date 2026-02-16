import {
  Box,
  Flex,
  Heading,
  Spinner,
  Table,
  Text,
} from '@radix-ui/themes'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { productsStore } from '@/app/store/productsStore'

function HomePageInner() {
  const { products, loading, error, fetchProducts } = productsStore

  useEffect(() => {
    void fetchProducts({ limit: 20, skip: 0 })
  }, [fetchProducts])

  if (loading && products.length === 0) {
    return (
      <Box>
        <Heading size="5" mb="4">
          Products
        </Heading>
        <Spinner size="3" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Heading size="5" mb="4">
          Products
        </Heading>
        <Text color="red">{error}</Text>
      </Box>
    )
  }

  return (
    <Flex direction="column" className="min-h-0 flex-1">
      <Heading size="5" mb="4">
        Products
      </Heading>
      <Box className="min-h-0 flex-1">
        <Table.Root className="h-full min-h-0">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Brand</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Stock</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Rating</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products.map((product) => (
              <Table.Row key={product.id}>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.brand}</Table.Cell>
                <Table.Cell>${product.price.toFixed(2)}</Table.Cell>
                <Table.Cell>{product.stock}</Table.Cell>
                <Table.Cell>{product.rating}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Flex>
  )
}

const HomePage = observer(HomePageInner)
export { HomePage }
