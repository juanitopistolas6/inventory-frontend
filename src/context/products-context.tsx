import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { IOrder, IProduct, IResponse } from '../util/interfaces'
import { useAxios } from '../hooks/use-axios'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from './auth-context'

interface IProductContext {
  products: IProduct[] | undefined
  categories: string[] | undefined
  categoryFilter: string | null
  orders: IOrder[] | undefined
  resetFilters: () => void
  filterProducts: (category: string) => void
  filterByName: (name: string | undefined) => void
}

const productsContext = createContext<IProductContext | null>(null)

export const ProdctProvider = ({ children }: { children: ReactNode }) => {
  const { axios } = useAxios()
  const { isAuthenticated } = useAuth()
  const [categoryFilter, setFilter] = useState<string | null>(null)
  const [nameFilter, setName] = useState<string | null>(null)

  const {
    data: productsR,
    isSuccess,
    refetch,
  } = useQuery<IResponse<IProduct[]>>({
    enabled: isAuthenticated,
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get<IResponse<IProduct[]>>('/product')

      return response.data
    },
  })

  const { data: orders } = useQuery<IOrder[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await axios.get<IResponse<IOrder[]>>('/order')

      return response.data.data
    },
  })

  const products = useMemo(() => {
    if (!isSuccess) return

    if (!categoryFilter && !nameFilter) return productsR.data

    return productsR.data.filter((item) => {
      const categoryMatches = categoryFilter
        ? item.category === categoryFilter
        : true
      const nameMatches = nameFilter
        ? item.name.toLowerCase().includes(nameFilter)
        : true
      return categoryMatches && nameMatches
    })
  }, [productsR, categoryFilter, nameFilter])

  const categories = useMemo(() => {
    return productsR?.data.reduce((acc, current) => {
      if (!acc.includes(current.category)) acc.push(current.category)

      return acc
    }, [] as string[])
  }, [products])

  const filterProducts = (category: string): void => {
    if (!categories?.includes(category)) return

    setFilter(category)
  }

  const filterByName = (name: string | undefined) => {
    if (!name) {
      setName(null)
      return
    }

    setName(name.toLowerCase())
  }

  const resetFilters = () => {
    setFilter(null)
    refetch()
  }

  const values: IProductContext = {
    products,
    categories,
    filterProducts,
    resetFilters,
    categoryFilter,
    filterByName,
    orders,
  }

  return (
    <productsContext.Provider value={values}>
      {children}
    </productsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(productsContext)

  if (!context) throw new Error('product context must be used within its reach')

  return context
}
