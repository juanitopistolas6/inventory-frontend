import { useMemo } from 'react'
import { useCart } from '../context/cart-context'
import { CartItem } from './cart-item'

export const OrderBill = () => {
  const { state, createOrder } = useCart()

  const totalPrice = useMemo(() => {
    const total = state.cart?.cart.reduce((acc, current) => {
      const { product } = current

      return (acc += product.price * current.units)
    }, 0 as number)

    return total?.toFixed(2)
  }, [state])

  return (
    <div className="flex-col h-full">
      <div className="bg-white w-full rounded-md px-3 gap-2">
        <h1 className="text-2xl font-bold border-b pt-1">Carro de compras</h1>

        <div className="flex-col space-y-3">
          <div className="flex-col space-y-3 py-3">
            {/* Cart */}

            {state.cart?.cart.map((item) => {
              return <CartItem {...item} key={item.product._id} />
            })}
          </div>

          <div className="flex-col py-2 space-y-3">
            {/* Payment process*/}

            <div className="flex justify-between py-3 border-b-2 border-dotted">
              <span className="font-bold text-green-500">Total</span>
              <span className="font-bold">{`$${totalPrice ?? 0}`}</span>
            </div>

            <div className="flex items-center w-full">
              <button
                className="text-[20px] text-white mx-auto px-12 py-1 shadow-lg rounded-md hover:bg-blue-600 bg-blue-400"
                onClick={() => {
                  createOrder()
                }}
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
