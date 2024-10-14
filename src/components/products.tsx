import { ProductCard } from './product-card'
import { useProducts } from '../context/products'
import { CategoryButton } from './category-button'

export const Products = () => {
  const { products, categories } = useProducts()

  return (
    <div className="flex-col space-y-4">
      <h1 className="text-start font-bold text-3xl">Lista de productos</h1>

      <div className="flex gap-3">
        <CategoryButton standard />

        {categories?.map((category) => {
          return (
            <CategoryButton
              category={category}
              standard={false}
              key={category}
            />
          )
        })}
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
