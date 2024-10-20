import { useMemo, useState } from 'react'
import { useProducts } from '../context/products-context'
import { CategoryButton } from './category-button'
import { HeroIcons } from './ui/heroicons'
import cn from 'clsx'

const initialValue = {
  start: 0,
  end: 7,
}

interface INextPrevOrder {
  start: number
  end: number
}

export const Categories = () => {
  const { categories } = useProducts()

  const [scroll, setScroll] = useState<INextPrevOrder>(initialValue)

  const slicedOrders = useMemo(() => {
    const { end, start } = scroll

    return categories?.slice(start, end)
  }, [scroll, categories])

  const next = () => {
    if (scroll.end + 1 > (categories?.length ?? 0)) return

    setScroll((prev) => ({ start: prev.start + 1, end: prev.end + 1 }))
  }

  const prev = () => {
    if (scroll.start - 1 < 0) return

    setScroll((prev) => ({ start: prev.start - 1, end: prev.end - 1 }))
  }

  return (
    <div className="w-full flex gap-4 relative">
      <div className={cn('flex', scroll.start - 1 > 0 ? 'block' : 'hidden')}>
        <button
          className="-ml-4 p-2 absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => prev()}
        >
          <HeroIcons name="ArrowLeftIcon" />
        </button>
      </div>
      <div className="flex gap-4">
        <CategoryButton standard />

        {slicedOrders?.map((category) => {
          return (
            <CategoryButton
              category={category}
              standard={false}
              key={category}
            />
          )
        })}
      </div>
      <div
        className={cn(
          'flex',
          scroll.end + 1 <= (categories?.length ?? 0) ? 'block' : 'hidden'
        )}
      >
        <button className="-ml-4 p-2" onClick={() => next()}>
          <HeroIcons name="ArrowRightIcon" />
        </button>
      </div>
    </div>
  )
}
