export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  thumbnail: string
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type ProductCategory = {
  slug: string
  name: string
  url: string
}

export type ProductSortBy = 'title' | 'price' | 'stock' | 'rating'

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type ProductsTableQueryParams = {
  searchTerm?: string
  category?: string
  sortBy?: ProductSortBy
  order?: SortOrder
  take: number
  skip: number
}

