import { SubmitHandler, useForm } from 'react-hook-form'
import { HeroIcons } from '../ui/heroicons'
import TextField from '@mui/material/TextField'
import { useCart } from '../../context/cart-context'
import cn from 'clsx'

interface IProductForm {
  name: string
  category: string
  banner: string
  price: number
  suplier: string
  units: number
}

interface productModalProps {
  closeModal: () => void
}

export const ProductModal = (props: productModalProps) => {
  const { closeModal } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductForm>()
  const { createProduct } = useCart()

  const submit: SubmitHandler<IProductForm> = (data) => {
    createProduct(data)

    closeModal()
  }

  return (
    <div className="w-80 h-auto flex-col rounded-l-3xl rounded-r-3xl bg-white py-3 px-4">
      <div className="flex justify-between py-2 items-center w-full">
        <button
          className="rounded-2xl hover:bg-gray-200"
          onClick={() => {
            closeModal()
          }}
        >
          <HeroIcons name="XMarkIcon" />
        </button>

        <button className="rounded-2xl hover:bg-gray-200 p-[2px]">
          <HeroIcons name="EyeIcon" />
        </button>
      </div>

      <div className="flex-col space-y-3">
        <h1 className="font-bold text-xl text-left w-full">Añadir producto</h1>

        <form
          className="w-full flex-col space-y-2"
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex-col space-y-2">
            <TextField
              id="outlined-required"
              label="Nombre"
              className="w-full"
              {...register('name', { required: true })}
            />
            <p
              className={cn(
                'bg-red-600 text-white text-sm border-black px-1 text-center',
                errors.name ? 'block' : 'hidden'
              )}
            >
              {errors.name?.message}
            </p>
          </div>

          <div className="flex-col space-y-2">
            <TextField
              id="outlined-required"
              label="Categoria"
              className="w-full"
              {...register('category', { required: true })}
            />
            <p
              className={cn(
                'bg-red-600 text-white text-sm border-black px-1 text-center',
                errors.category ? 'block' : 'hidden'
              )}
            >
              {errors.category?.message}
            </p>
          </div>

          <div className="flex-col space-y-2">
            <TextField
              id="outlined-required"
              label="Banner (URL)"
              className="w-full"
              {...register('banner', { required: true })}
            />
            <p
              className={cn(
                'bg-red-600 text-white text-sm border-black px-1 text-center',
                errors.category ? 'block' : 'hidden'
              )}
            >
              {errors.category?.message}
            </p>
          </div>

          <div className="flex gap-1">
            <div className="flex-col space-y-2">
              <TextField
                id="outlined-required"
                label="Precio"
                className="w-full"
                {...register('price', {
                  required: true,
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || 'El input debe ser un número positivo',
                })}
              />
              <p
                className={cn(
                  'bg-red-600 text-sm text-white border-black px-1 text-center',
                  errors.price ? 'block' : 'hidden'
                )}
              >
                {errors.price?.message}
              </p>
            </div>

            <div className="flex-col space-y-2">
              <TextField
                id="outlined-required"
                label="Unidades"
                className="w-full"
                {...register('units', {
                  required: true,
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || 'El input debe ser un número positivo',
                })}
              />
              <p
                className={cn(
                  'bg-red-600 text-sm text-white border-black px-1 text-center',
                  errors.units ? 'block' : 'hidden'
                )}
              >
                {errors.units?.message}
              </p>
            </div>
          </div>

          <div className="flex-col space-y-2">
            <TextField
              id="outlined-required"
              label="Provedor"
              className="w-full"
              {...register('suplier', { required: true })}
            />
            <p
              className={cn(
                'bg-red-600 text-white border-black px-1 text-center',
                errors.suplier ? 'block' : 'hidden'
              )}
            >
              {errors.suplier?.message}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button className="px-5 py-3 rounded-xl bg-red-500 text-white font-bold">
              Cancerlar
            </button>

            <button
              className="px-5 py-3 rounded-xl bg-blue-500 text-white font-bold"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
