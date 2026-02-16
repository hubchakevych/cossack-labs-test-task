import { Box, Flex, Heading, Link, Text } from '@radix-ui/themes'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginForm } from '@/features/auth'
import { PagesPaths } from '@/shared/config'

const LoginPage = () => {
  const navigate = useNavigate()

  const handleOnSuccess = useCallback(() => {
    void navigate(PagesPaths.Home)
  }, [navigate])

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-screen min-h-0 overflow-auto p-6 bg-background text-foreground"
    >
      <Box className="w-full max-w-[360px] p-6 border border-border rounded-lg bg-background">
        <Heading size="5" mb="2">
          Sign in
        </Heading>
        <Text as="p" mb="4" className="text-sm text-muted-foreground">
          Use any user from{' '}
          <Link
            href="https://dummyjson.com/users"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            DummyJSON users
          </Link>
          . e.g. emilys / emilyspass
        </Text>
        <LoginForm onSuccess={handleOnSuccess} />
      </Box>
    </Flex>
  )
}

export { LoginPage }
