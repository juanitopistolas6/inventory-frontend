import { ProductCard } from './product-card'
import { useProducts } from '../context/products-context'
import { OrdersHistory } from './orders-history'
import { Categories } from './categories'

export const Products = () => {
  const { products } = useProducts()

  return (
    <div className="flex-col space-y-4">
      <div className="flex-col space-y-2">
        <h1 className="text-start font-bold text-3xl">Ordenes</h1>

        <OrdersHistory />
      </div>

      <h1 className="text-start font-bold text-3xl">Lista de productos</h1>

      <div className="flex gap-3">
        <Categories />
      </div>

      <div className="border-b-1 border border-gray-400"></div>

      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 gap-3">
        {products?.map((product) => {
          return <ProductCard {...product} key={product._id} />
        })}
      </div>
    </div>
  )
}
