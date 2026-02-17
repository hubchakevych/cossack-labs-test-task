/**
 * Returns a display string from form/validation error (string or { message }).
 */
export function getErrorMessage(err: unknown): string | undefined {
  if (!err) {
    return undefined
  }

  if (typeof err === 'string') {
    return err
  }

  if (typeof err === 'object' && err !== null && 'message' in err) {
    const message = (err as { message: unknown }).message
    return typeof message === 'string' ? message : undefined
  }

  return undefined
}
