import * as Label from '@radix-ui/react-label'
import { Box } from '@radix-ui/themes'

type FormFieldProps = {
  label: React.ReactNode
  error?: string
  children: React.ReactNode
  /** Optional id for the input; links label via htmlFor for a11y */
  id?: string
}

export const FormField = ({ label, error, children, id }: FormFieldProps) => {
  return (
    <Box>
      <Label.Root
        htmlFor={id}
        className="block text-sm font-medium mb-1.5"
      >
        {label}
      </Label.Root>
      {children}
      {error && (
        <span className="text-red-500 text-sm block mt-1" role="alert">
          {error}
        </span>
      )}
    </Box>
  )
}
