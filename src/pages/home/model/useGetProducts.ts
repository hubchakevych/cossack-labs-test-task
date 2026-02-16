import { useEffect } from 'react'

import { productsStore } from '@/app/store/productsStore'

export const useGetProducts = () => {
  const { products, loading, error, getProducts } =
    productsStore

  useEffect(() => {
    void getProducts({ limit: 20, skip: 0 })
  }, [getProducts])

  return { products, loading, error }
}
