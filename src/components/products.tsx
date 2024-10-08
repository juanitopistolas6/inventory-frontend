import { ProductCard } from './product-card'

export const Products = () => {
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
        <ProductCard />

        <ProductCard />

        <ProductCard />

        <ProductCard />

        <ProductCard />

        <ProductCard />
      </div>
    </div>
  )
}
