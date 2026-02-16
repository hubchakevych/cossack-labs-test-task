import { Box, Button, Flex, Link as RadixLink, Spinner } from '@radix-ui/themes'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import { PagesPaths } from '@/shared/config'
import { useGetCurrentUser } from '@/widgets/header/model'

const HeaderInner = () => {
  const {
    handleLogout,
    currentUserStore: { currentUser, loading },
  } = useGetCurrentUser()

  return (
    <Box className="border-b border-border py-3 px-6">
      <Flex justify="between" align="center" gap="4">
        <RadixLink asChild>
          <Link
            to={PagesPaths.Home}
            className="text-lg font-semibold text-foreground no-underline hover:opacity-80"
          >
            Admin Dashboard
          </Link>
        </RadixLink>
        <Flex align="center" gap="4">
          {loading && <Spinner />}
          {!loading && currentUser && (
            <Box as="span" className="text-sm text-muted-foreground">
              {currentUser.firstName} {currentUser.lastName}
            </Box>
          )}
          <Button type="button" variant="outline" onClick={handleLogout}>
            Log out
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export const Header = observer(HeaderInner)
