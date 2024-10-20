import { ICartProduct, IOrder } from '../../util/interfaces'

export const OrderDetail = (order: { order: IOrder | null }) => {
  if (!order.order) return

  const { _id, amount, items } = order.order

  const amountItesm = items.reduce((acc, current) => {
    return acc + current.units
  }, 0 as number)

  return (
    <div className="w-[500px] flex h-[500px] bg-white p-5 rounded-2xl">
      <div className="flex-col w-full h-full">
        <div className="flex-col space-y-5 border-b border-black">
          <div className="flex justify-between">
            <p className="font-bold">ID:</p>
            <p className="hover:underline">{_id}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-bold">Total:</p>
            <p className="hover:underline">{amount.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-bold">N. Items:</p>
            <p className="hover:underline">{amountItesm}</p>
          </div>
        </div>

        <div className="flex-col space-y-3 w-full h-auto py-3">
          <h1 className="text-2xl font-bold text-black">ITEMS</h1>

          <div className="flex-col space-y-3">
            {items.map((item) => {
              return <ItemCard {...item} key={item.product._id} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const ItemCard = (product: ICartProduct) => {
  const { banner, category, name } = product.product

  return (
    <div className="flex gap-4 justify-between h-full">
      <div>
        <img
          className="flex"
          src="https://m.media-amazon.com/images/I/51Sb35c6-YL.jpg"
          width={68}
        />
      </div>

      <div className="flex-col flex w-full">
        <p className="mt-auto w-full">{category}</p>
        <p className="flex items-end mb-auto">{name}</p>
      </div>

      <p className="flex items-center min-w-fit">{`x${product.units} item(s)`}</p>
    </div>
  )
}
