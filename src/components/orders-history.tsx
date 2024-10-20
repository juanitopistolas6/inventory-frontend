import { useMemo, useState } from 'react'
import { useProducts } from '../context/products-context'
import { HeroIcons } from './ui/heroicons'
import { OrderCard } from './order-card'
import { Modal } from './modal'
import { useModal } from '../hooks/use-modal'
import { OrderDetail } from './modals/order-detail'
import { IOrder } from '../util/interfaces'

const initialValue = {
  start: 0,
  end: 4,
}

interface INextPrevOrder {
  start: number
  end: number
}

export const OrdersHistory = () => {
  const { orders } = useProducts()
  const { open, handleClose, handleOpen } = useModal()
  const [scroll, setScroll] = useState<INextPrevOrder>(initialValue)
  const [item, setItem] = useState<IOrder | null>(null)

  console.log(orders)

  const slicedOrders = useMemo(() => {
    const { end, start } = scroll

    return orders?.slice(start, end)
  }, [scroll, orders])

  const next = () => {
    if (scroll.end + 1 > (orders?.length ?? 0)) return

    setScroll((prev) => ({ start: prev.start + 1, end: prev.end + 1 }))
  }

  const prev = () => {
    if (scroll.start - 1 < 0) return

    setScroll((prev) => ({ start: prev.start - 1, end: prev.end - 1 }))
  }

  const handleClick = (item: IOrder) => {
    setItem(item)
    handleOpen()
  }

  return (
    <>
      <Modal
        open={open}
        closeModal={handleClose}
        className="flex items-start justify-center top-10 w-full"
      >
        <OrderDetail order={item} />
      </Modal>
      <div className="w-full h-28 relative">
        <div className="absolute flex top-1/2 -translate-y-1/2 w-full z-10">
          {scroll.start - 1 > 0 ? (
            <button
              className="-ml-4 rounded-full p-2 bg-white shadow-lg absolute left-0 top-1/2 -translate-y-1/2"
              onClick={() => prev()}
            >
              <HeroIcons name="ArrowLeftIcon" />
            </button>
          ) : null}
          {scroll.end + 1 <= (orders?.length ?? 0) ? (
            <button
              className="rounded-full -mr-4 p-2 bg-white shadow-lg absolute right-0 top-1/2 -translate-y-1/2"
              onClick={() => next()}
            >
              <HeroIcons name="ArrowRightIcon" />
            </button>
          ) : null}
        </div>
        <div className="w-full h-full flex items-center z-0 gap-5 px-2  overflow-hidden">
          {slicedOrders?.map((item) => {
            return (
              <button
                key={item._id}
                onClick={() => {
                  handleClick(item)
                }}
              >
                <OrderCard {...item} />
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
