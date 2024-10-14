import { useCart } from '../context/cart-context'
import { ICartProduct } from '../util/interfaces'
import { HeroIcons } from './ui/heroicons'

export const CartItem = (product: ICartProduct) => {
  const { _id, banner, name, price, units } = product.product
  const { addToCart, removeFromCart, removeItem } = useCart()

  return (
    <div
      className="flex justify-between rounded-md bg-gray-100 px-2 py-3"
      id={_id}
    >
      <div className="flex gap-1">
        <img src={banner} className="h-14 object-cover" />

        <div className="flex-col m-auto">
          <p className="text-sm xl:hidden 2xl:block ">{name}</p>
          <p className="text-sm">{`$${price}`}</p>
        </div>
      </div>

      <div className="flex-col my-auto">
        <div className="flex items-center bg-white rounded-xl px-1">
          <button
            className="text-black border font-bold border-gray-300 rounded-full p-1 hover:bg-gray-200"
            onClick={() => {
              removeFromCart(product.product)
            }}
            disabled={(product.units ?? 0) <= 0}
          >
            <HeroIcons name="MinusIcon" className="w-3 h-3" />
          </button>

          <span className="mx-3 text-lg">{product.units}</span>

          <button
            className="flex text-white bg-blue-500 font-bold rounded-full p-1 hover:bg-blue-600"
            onClick={() => {
              addToCart(product.product)
            }}
            disabled={product.units >= units}
          >
            <HeroIcons name="PlusIcon" className="w-3 h-3" />
          </button>
        </div>

        <button
          className="text-[12px] text-red-500 text-end w-full hover:underline"
          onClick={() => {
            removeItem(product)
          }}
        >
          Remove
        </button>
      </div>
    </div>
  )
}
