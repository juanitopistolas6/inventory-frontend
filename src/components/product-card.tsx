import { useCart } from '../context/cart-context'
import { IProduct } from '../util/interfaces'
import { HeroIcons } from './ui/heroicons'

export const ProductCard = (product: IProduct) => {
  const { _id, banner, category, name, price } = product
  const { addToCart, removeFromCart, state } = useCart()

  const inCart = state.cart?.cart.find((item) => item.product._id === _id)

  return (
    <div
      className="mx-auto bg-white rounded-lg px-1 py-2 border-2  overflow-hidden"
      id={_id}
    >
      <img
        className="w-full h-48 object-cover border rounded-t-md"
        src={banner}
      />

      <div className="p-4 relative flex-col justify-between">
        <div className="relative top-1">
          <p className="text-sm text-gray-500">{category}</p>
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">{`$${price}`}</span>

          <div className="flex items-center">
            <button
              className="text-black border font-bold border-gray-300 rounded-full p-1 hover:bg-gray-200"
              onClick={() => {
                removeFromCart(product)
              }}
              disabled={(inCart?.units ?? 0) <= 0}
            >
              <HeroIcons name="MinusIcon" className="w-5 h-5" />
            </button>

            <span className="mx-3 text-lg">{inCart?.units ?? 0}</span>

            <button
              className="flex text-white bg-blue-500 font-bold rounded-full p-1 hover:bg-blue-600"
              onClick={() => {
                addToCart(product)
              }}
              disabled={(inCart?.units ?? 0) >= product.units}
            >
              <HeroIcons name="PlusIcon" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
