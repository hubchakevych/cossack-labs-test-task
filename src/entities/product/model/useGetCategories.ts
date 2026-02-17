import { useEffect } from 'react'

import { productsStore } from '@/app/store/productsStore'

export const useGetCategories = (shouldFetch: boolean) => {
  const { categories, categoriesLoading, getCategories } = productsStore

  useEffect(() => {
    if (shouldFetch) {
      void getCategories()
    }
  }, [shouldFetch, getCategories])

  return { categories, categoriesLoading }
}
