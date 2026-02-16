import { zodResolver } from '@hookform/resolvers/zod'
import * as Label from '@radix-ui/react-label'
import { Box, Button, TextField } from '@radix-ui/themes'
import { observer } from 'mobx-react-lite'
import { Controller, useForm } from 'react-hook-form'

import { authStore } from '@/app/store'
import { type LoginFormValues, loginSchema } from '@/features/auth/model'
import { cn } from '@/shared/lib'

import { defaultValues } from '../constants'

type LoginFormProps = {
  onSuccess: () => void
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const {
    control,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormValues) => {
    const { username, password } = data

    await authStore.login(username, password)

    if (!authStore.error) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={(e) => void rhfHandleSubmit(onSubmit)(e)} className="space-y-4">
      <Box mb="4">
        <Label.Root className="block text-sm font-medium mb-1.5">
          Username
        </Label.Root>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField.Root
              type="text"
              placeholder="Username"
              className={cn(
                'border border-border rounded-md !shadow-none',
                errors.username && '!border-red-500',
              )}
              {...field}
            />
          )}
        />
        {errors.username?.message && (
          <Box className="text-xs text-red-500 mt-1" role="alert">
            {errors.username.message}
          </Box>
        )}
      </Box>
      <Box mb="5">
        <Label.Root className="block text-sm font-medium mb-1.5">
          Password
        </Label.Root>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField.Root
              type="password"
              placeholder="Password"
              className={cn(
                'border border-border rounded-md shadow-none',
                errors.password && 'border-red-500',
              )}
              {...field}
            />
          )}
        />
        {errors.password?.message && (
          <Box className="text-xs text-red-500 mt-1" role="alert">
            {errors.password.message}
          </Box>
        )}
      </Box>
      {authStore.error && (
        <Box className="text-sm text-red-500 mb-4" role="alert">
          {authStore.error}
        </Box>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        loading={authStore.loading}
        className="w-full"
      >
        Sign in
      </Button>
    </form>
  )
}

export const LoginFormObserved = observer(LoginForm)
