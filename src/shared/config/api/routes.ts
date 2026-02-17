
export const ApiRoutes = {
  Auth: {
    Login: '/auth/login',
    Me: '/auth/me',
    Refresh: '/auth/refresh',
  },
  Products: '/products',
  ProductsSearch: '/products/search',
  ProductsByCategory: '/products/category',
  ProductsCategories: '/products/categories',
} as const
