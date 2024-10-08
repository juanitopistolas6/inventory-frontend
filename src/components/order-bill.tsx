import { CartItem } from './cart-item'

export const OrderBill = () => {
  return (
    <div className="flex-col">
      <div className="bg-white w-full rounded-md px-3 gap-2">
        <h1 className="text-2xl font-bold border-b pt-1">Order Bill</h1>

        <div className="flex-col space-y-3">
          <div className="flex-col space-y-3 py-3">
            {/* Cart */}

            <CartItem />
          </div>

          <div className="flex-col py-2 space-y-3">
            {/* Payment process*/}

            <div className="flex justify-between py-3 border-b-2 border-dotted">
              <span className="font-bold text-green-500">Total</span>
              <span className="font-bold">$75</span>
            </div>

            <div className="flex items-center w-full">
              <button className="text-[20px] text-white mx-auto px-12 py-1 shadow-lg rounded-md hover:bg-blue-600 bg-blue-400">
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
