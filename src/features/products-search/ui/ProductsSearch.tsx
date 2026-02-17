import { TextField } from '@radix-ui/themes'
import { useEffect, useState } from 'react'

import { useDebouncedValue } from '@/shared/lib'

type ProductsSearchProps = {
  value: string
  onChange: (nextValue: string) => void
}

export const ProductsSearch = ({ value, onChange }: ProductsSearchProps) => {
  const [searchInputValue, setSearchInputValue] = useState(value)
  const debouncedSearchInputValue = useDebouncedValue(searchInputValue, 350)

  useEffect(() => {
    setSearchInputValue(value)
  }, [value])

  useEffect(() => {
    if (debouncedSearchInputValue === value) {
      return
    }
    onChange(debouncedSearchInputValue)
  }, [debouncedSearchInputValue, onChange, value])

  return (
    <TextField.Root
      placeholder="Search by title..."
      value={searchInputValue}
      onChange={(event) => setSearchInputValue(event.target.value)}
    />
  )
}
