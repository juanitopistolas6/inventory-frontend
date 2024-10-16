import { IOrder } from '../util/interfaces'

export const OrderCard = (order: IOrder) => {
  const { _id, amount, items } = order

  const itemNumbers = items.reduce((acc, current) => {
    return acc + current.units
  }, 0 as number)

  return (
    <div className="bg-green-200 px-4 py-2 h-24 rounded-xl flex-col">
      <div className="flex justify-center items-center">
        <h1 className="font-bold text-lg">orden:</h1>
        <h1 className="font-bold text-[16px] text-justify">{_id}</h1>
      </div>

      <div className="flex justify-between px-4">
        <div className="flex gap-1">
          <p>items:</p>
          <p>{` ${itemNumbers}`}</p>
        </div>

        <div className="flex gap-1">
          <p>cantidad:</p>
          <p>{` ${amount.toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  )
}
