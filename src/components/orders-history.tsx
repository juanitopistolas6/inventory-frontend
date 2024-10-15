import { useMemo, useState } from 'react'
import { useProducts } from '../context/products-context'
import { HeroIcons } from './ui/heroicons'

const initialValue = {
  start: 0,
  end: 3,
}

interface INextPrevOrder {
  start: number
  end: number
}

export const OrdersHistory = () => {
  const { orders } = useProducts()
  const [scroll, setScroll] = useState<INextPrevOrder>(initialValue)

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

  return (
    <div className="w-full h-full relative">
      <div className="flex justify-between items-center w-full  relative z-10">
        <button className="rounded-full p-2 bg-white shadow-lg">
          <HeroIcons name="ArrowLeftIcon" />
        </button>

        <button className="rounded-full p-2 bg-white shadow-lg">
          <HeroIcons name="ArrowRightIcon" />
        </button>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center text-4xl z-0">
        adoawkdpoakdpoakdwpo
      </div>
    </div>
  )
}
