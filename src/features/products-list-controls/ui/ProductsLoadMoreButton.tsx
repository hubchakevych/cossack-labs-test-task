import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'

type ProductsLoadMoreButtonProps = {
  loading: boolean
  onLoadMore: () => void
}

export const ProductsLoadMoreButton = ({
  loading,
  onLoadMore,
}: ProductsLoadMoreButtonProps) => {
  return (
    <Flex justify="center" mt="4">
      <Button variant="outline" onClick={onLoadMore} disabled={loading}>
        {!loading && <ChevronDownIcon width={14} height={14} />}
        {loading ? 'Loading...' : 'Show more'}
      </Button>
    </Flex>
  )
}
