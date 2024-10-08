import { HeroIcons } from './ui/heroicons'
import { Modal } from './modal'
import { Access } from './modals/access'
import { useModal } from '../hooks/use-modal'

export const ProfileButton = () => {
  const { open, handleClose, handleOpen } = useModal()

  return (
    <>
      <Modal
        open={open}
        closeModal={handleClose}
        className="flex items-start justify-center top-10 w-full"
      >
        <Access closeModal={handleClose} />
      </Modal>

      <button
        className="flex gap-1 items-center rounded-3xl hover:bg-gray-100 px-2"
        onClick={handleOpen}
      >
        <HeroIcons name="UserCircleIcon" className="h-full stroke-1" />
        <div className="block text-[14px] space-y-0">
          <p className="font-bold text-end h-4">juanitopistolas</p>
          <p className="align-text-top h-full">rodriguez</p>
        </div>
      </button>
    </>
  )
}
