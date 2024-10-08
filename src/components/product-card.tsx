import { HeroIcons } from './ui/heroicons'

export const ProductCard = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg p-1 border-2  overflow-hidden">
      <img
        className="w-full h-48 object-cover border rounded-t-md"
        src="https://www.shutterstock.com/shutterstock/photos/2378798341/display_1500/stock-photo-white-washing-machine-isolated-on-a-white-background-front-load-washer-machine-with-electronic-2378798341.jpg"
      />

      <div className="p-4 flex-col">
        <p className="text-sm text-gray-500">Lunch</p>

        <h2 className="text-xl font-bold text-gray-800">
          Grilled Salmon Steak
        </h2>

        <div className="mt-4 flex items-center justify-between w-full gap-1">
          <div>
            <span className="text-lg font-semibold text-gray-900">$15.00</span>
          </div>

          <div className="flex items-center">
            <button className="text-black border font-bold border-gray-300 rounded-full p-1 hover:bg-gray-200">
              <HeroIcons name="MinusIcon" className="w-5 h-5" />
            </button>

            <span className="mx-3 text-lg">0</span>

            <button className="flex text-white bg-blue-500 font-bold rounded-full p-1 hover:bg-blue-600">
              <HeroIcons name="PlusIcon" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
