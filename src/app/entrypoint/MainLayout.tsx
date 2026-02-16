import { Flex } from '@radix-ui/themes'
import { Outlet } from 'react-router-dom'

import { Header } from '@/widgets/header'

const MainLayout = () => {
  return (
    <Flex
      direction="column"
      className="h-full overflow-hidden bg-background text-foreground"
    >
      <Header />
      <Flex direction="column" className="min-h-0 flex-1 overflow-auto p-6">
        <Outlet />
      </Flex>
    </Flex>
  )
}

export { MainLayout }
export default MainLayout
