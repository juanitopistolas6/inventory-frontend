import { OrderBill } from '../components/order-bill'
import { Products } from '../components/products'
import { HeroIcons } from '../components/ui/heroicons'

export const Order = () => {
  return (
    <div className="flex h-full">
      <div className="w-[12%] border-r py-4 px-3">
        <button className="px-2 py-2 flex gap-2 rounded-lg hover:bg-gray-100 w-full">
          <HeroIcons name="ShoppingBagIcon" />
          <p className="font-bold text-start">Productos</p>
        </button>
      </div>
      <div className="w-10/12 border-r px-5 pt-4">
        <Products />
      </div>
      <div className="w-1/4 bg-gray-100 px-5 py-4">
        <OrderBill />
      </div>
    </div>
  )
}
