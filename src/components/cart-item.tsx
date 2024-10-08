import { HeroIcons } from './ui/heroicons'

export const CartItem = () => {
  return (
    <div className="flex justify-between rounded-md bg-gray-100 px-2 py-3">
      <div className="flex gap-1">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/2378798341/display_1500/stock-photo-white-washing-machine-isolated-on-a-white-background-front-load-washer-machine-with-electronic-2378798341.jpg"
          className="h-14 object-cover"
        />

        <div className="flex-col m-auto">
          <p className="text-sm xl:hidden 2xl:block ">Grilled Salmon Steak</p>
          <p className="text-sm">$15.00</p>
        </div>
      </div>

      <div className="flex-col my-auto">
        <div className="flex items-center bg-white rounded-xl px-1">
          <button className="text-black border font-bold border-gray-300 rounded-full p-1 hover:bg-gray-200">
            <HeroIcons name="MinusIcon" className="w-3 h-3" />
          </button>

          <span className="mx-3 text-lg">5</span>

          <button className="flex text-white bg-blue-500 font-bold rounded-full p-1 hover:bg-blue-600">
            <HeroIcons name="PlusIcon" className="w-3 h-3" />
          </button>
        </div>

        <button className="text-[12px] text-red-500 text-end w-full hover:underline">
          Remove
        </button>
      </div>
    </div>
  )
}
