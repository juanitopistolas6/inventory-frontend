import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/auth-context'
import { ProductCard } from './product-card'
import { IProduct, IResponse } from '../util/interfaces'

export const Products = () => {
  const { axios } = useAuth()

  const { data: productResponse } = useQuery<IResponse<IProduct[]>>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('/product')

      return response.data
    },
  })

  return (
    <div className="flex-col space-y-4">
      <h1 className="text-start font-bold text-3xl">Lista de productos</h1>

      <div className="flex gap-3">
        <button className="py-1 px-2 font-semibold border-[2px] border-green-400 rounded-md hover:-gray-300">
          Todos
        </button>

        <button className="py-1 px-2 font-semibold border-[2px] rounded-md hover:-gray-300">
          Categoria 1
        </button>

        <button className="py-1 px-2 font-semibold border-[2px] rounded-md hover:-gray-300">
          Categoria 2
        </button>

        <button className="py-1 px-2 font-semibold border-[2px] rounded-md hover:-gray-300">
          Categoria 3
        </button>
      </div>

      <div className="border-b-1 border border-gray-400"></div>

      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 gap-3">
        {productResponse?.data.map((product) => {
          return <ProductCard {...product} key={product._id} />
        })}
      </div>
    </div>
  )
}
