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
        <img src={banner} height={48} className="h-12 w-fit object-cover" />

        <div className="flex-col m-auto flex">
          <p className="text-sm xl:hidden 2xl:block ">{name}</p>
          <p className="text-sm">{`$${price}`}</p>
        </div>
      </div>

      <div className="flex-col my-auto">
        <div className="flex items-center bg-white rounded-xl px-1">
          <button
            className="text-black border xl:hidden 2xl:block font-bold border-gray-300 rounded-full p-1 hover:bg-gray-200"
            onClick={() => {
              removeFromCart(product.product)
            }}
            disabled={(product.units ?? 0) <= 0}
          >
            <HeroIcons name="MinusIcon" className="w-3 h-3" />
          </button>

          <div className="flex items-center">
            <HeroIcons
              name="ShoppingCartIcon"
              className="h-5 w-5 xl:block 2xl:hidden"
            />
            <span className="text-lg xl:mx-auto 2xl:mx-3">{product.units}</span>
          </div>

          <button
            className="flex text-white xl:hidden 2xl:block bg-blue-500 font-bold rounded-full p-1 hover:bg-blue-600"
            onClick={() => {
              addToCart(product.product)
            }}
            disabled={product.units >= units}
          >
            <HeroIcons name="PlusIcon" className="w-3 h-3" />
          </button>
        </div>

        <button
          className="text-[12px] xl:hidden 2xl:block text-red-500 text-end w-full hover:underline"
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
