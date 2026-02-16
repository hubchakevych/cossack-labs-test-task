import { Box, Flex } from '@radix-ui/themes'
import { Outlet } from 'react-router-dom'

import { Header } from '@/widgets/header'

const MainLayout = () => {
  return (
    <Flex
      direction="column"
      className="h-full overflow-hidden bg-background text-foreground"
    >
      <Header />
      <Box className="min-h-0 flex-1 overflow-hidden p-6">
        <Outlet />
      </Box>
    </Flex>
  )
}

export { MainLayout }

