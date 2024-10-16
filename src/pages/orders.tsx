import { Modal } from '../components/modal'
import { ProductModal } from '../components/modals/product'
import { OrderBill } from '../components/order-bill'
import { Products } from '../components/products'
import { HeroIcons } from '../components/ui/heroicons'
import { useModal } from '../hooks/use-modal'

export const Order = () => {
  const { handleClose, handleOpen, open } = useModal()
  return (
    <>
      <Modal
        open={open}
        closeModal={handleClose}
        className="flex items-start justify-center top-16 w-full"
      >
        <ProductModal closeModal={handleClose} />
      </Modal>
      <div className="flex h-full">
        <div className="w-[11%] border-r py-4 px-3">
          <button className="px-2 py-2 flex gap-2 rounded-lg hover:bg-gray-100 w-full sm:justify-center 2xl:justify-start">
            <HeroIcons
              name="ShoppingBagIcon"
              className="fill-blue-400 h-6 w-6"
            />
            <p className="sm:hidden 2xl:block font-bold text-start">
              Productos
            </p>
          </button>

          <button
            className="px-2 py-2 flex gap-2 rounded-lg hover:bg-gray-100 w-full sm:justify-center 2xl:justify-start"
            onClick={() => {
              handleOpen()
            }}
          >
            <HeroIcons
              name="PlusCircleIcon"
              className="w-6 h-6 fill-blue-400"
            />
            <p className="sm:hidden 2xl:block font-bold text-start">Añadir</p>
          </button>
        </div>
        <div className="w-10/12 border-r px-5 pt-4">
          <Products />
        </div>
        <div className="w-1/4 h-auto bg-gray-100 px-5 py-4">
          <OrderBill />
        </div>
      </div>
    </>
  )
}
