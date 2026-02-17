import { Flex } from '@radix-ui/themes'

import type { ProductCategory, ProductsTableQueryParams } from '@/entities/product'

import { ProductsCategoryFilter } from './ProductsCategoryFilter'
import { ProductsSearch } from './ProductsSearch'

type ProductsListFiltersProps = {
  params: ProductsTableQueryParams
  categories: ProductCategory[]
  onChange: (patch: Partial<ProductsTableQueryParams>) => void
}

export const ProductsListFilters = ({
  params,
  categories,
  onChange,
}: ProductsListFiltersProps) => {
  return (
    <Flex gap="3" mb="4" wrap="wrap">
      <ProductsSearch
        value={params.searchTerm || ''}
        onChange={(searchTerm) => {
          onChange({ searchTerm: searchTerm || undefined })
        }}
      />
      <ProductsCategoryFilter
        value={params.category || ''}
        categories={categories}
        onChange={(category) => {
          onChange({ category: category || undefined })
        }}
      />
    </Flex>
  )
}
