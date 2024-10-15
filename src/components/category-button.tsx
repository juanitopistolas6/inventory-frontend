import { useProducts } from '../context/products-context'
import cn from 'clsx'

export const CategoryButton = ({
  category,
  standard = false,
}: {
  category?: string
  standard: boolean
}) => {
  const { resetFilters, filterProducts, categoryFilter } = useProducts()

  const isSelected =
    categoryFilter || standard ? !!(categoryFilter == category) : false

  return (
    <div
      className="flex gap-3"
      onClick={() => {
        !standard && category ? filterProducts(category) : resetFilters()
      }}
    >
      <button
        className={cn(
          'py-1 px-2 font-semibold border-[2px] rounded-md hover:-gray-300',
          isSelected ? 'border-green-400' : ''
        )}
      >
        {standard ? 'Todos' : category}
      </button>
    </div>
  )
}
