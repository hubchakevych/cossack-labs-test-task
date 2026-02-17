import { Select } from '@radix-ui/themes'

import type { ProductCategory } from '@/entities/product'

type ProductsCategoryFilterProps = {
  value: string
  categories: ProductCategory[]
  onChange: (nextValue: string) => void
}

const ALL_CATEGORIES_VALUE = '__all_categories__'

export const ProductsCategoryFilter = ({
  value,
  categories,
  onChange,
}: ProductsCategoryFilterProps) => {
  return (
    <Select.Root
      value={value || ALL_CATEGORIES_VALUE}
      onValueChange={(nextValue) => {
        onChange(nextValue === ALL_CATEGORIES_VALUE ? '' : nextValue)
      }}
    >
      <Select.Trigger placeholder="Category" />
      <Select.Content>
        <Select.Item value={ALL_CATEGORIES_VALUE}>All categories</Select.Item>
        {categories.map((category) => (
          <Select.Item key={category.slug} value={category.slug}>
            {category.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
