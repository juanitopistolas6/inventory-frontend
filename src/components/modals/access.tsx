import { useMutation } from '@tanstack/react-query'
import { HeroIcons } from '../ui/heroicons'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { FormEvent } from 'react'

interface accessProp {
  closeModal: () => void
}

interface FormValues {
  user: string
  password: string
}

export const Access = (accessParams: accessProp) => {
  const { closeModal } = accessParams

  const { register, getValues } = useForm<FormValues>()

  const { data, mutate } = useMutation({
    mutationFn: async () => {
      const query = getValues()

      console.log(`query: ${query}`)

      return await axios.post('http://localhost:3000/auth/login', query)
    },
    onError: (err) => {
      console.error('Error during login:', err)
    },
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate()
  }

  console.log(data)

  return (
    <div className="w-full h-auto flex-col rounded-l-3xl rounded-r-3xl bg-white p-2">
      <div className="flex justify-between px-1">
        <button
          onClick={closeModal}
          className="rounded-full hover:bg-gray-200 p-1"
        >
          <HeroIcons name="XMarkIcon" />
        </button>
      </div>

      <div className="px-36 flex-col">
        <h1 className="flex py-6 text-2xl font-bold justify-center">
          Inicio de sesion
        </h1>

        <form className="flex-col space-y-12" onSubmit={onSubmit}>
          <div className="flex-col space-y-8">
            <textarea
              placeholder="Usuario"
              className="text-justify border-b h-8 w-full placeholder-gray-400 text-black resize-none focus:outline-none"
              {...register('user')}
            />

            <input
              placeholder="Contraseña"
              type="password"
              className="text-justify border-b w-full h-8 placeholder-gray-400 text-black resize-none focus:outline-none"
              {...register('password')}
            />
          </div>

          <button
            type="submit"
            className="w-full border bg-blue-400 text-xl font-bold text-white py-2 shadow-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
