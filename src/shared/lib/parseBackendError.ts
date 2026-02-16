import axios from 'axios'

const FALLBACK_MESSAGE = 'An unknown error occurred'

export const parseBackendError = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data as { message?: string }
    return typeof data.message === 'string' ? data.message : JSON.stringify(data)
  }

  return error instanceof Error ? error.message : FALLBACK_MESSAGE
}
