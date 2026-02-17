import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from '@radix-ui/react-icons'
import { Table, Text } from '@radix-ui/themes'
import type { KeyboardEvent } from 'react'

import { SortOrder } from '@/entities/product/model/types'

type SortableHeaderCellProps<TField extends string> = {
  label: string
  field: TField
  activeSortField?: TField
  sortOrder?: SortOrder
  className?: string
  onSortChange?: (field: TField) => void
}

const getSortIcon = (isActive: boolean, order?: SortOrder) => {
  if (!isActive) {
    return <CaretSortIcon width={14} height={14} />
  }

  return order === SortOrder.DESC
    ? <CaretDownIcon width={14} height={14} />
    : <CaretUpIcon width={14} height={14} />
}

export const SortableHeaderCell = <TField extends string>({
  label,
  field,
  activeSortField,
  sortOrder,
  className,
  onSortChange,
}: SortableHeaderCellProps<TField>) => {
  const isActive = activeSortField === field

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSortChange?.(field)
    }
  }

  return (
    <Table.ColumnHeaderCell className={className}>
      <Text
        as="span"
        role="button"
        tabIndex={0}
        onClick={() => onSortChange?.(field)}
        onKeyDown={handleKeyDown}
        className="inline-flex items-center gap-1 cursor-pointer select-none hover:text-gray-12"
      >
        {label}
        {getSortIcon(isActive, sortOrder)}
      </Text>
    </Table.ColumnHeaderCell>
  )
}
