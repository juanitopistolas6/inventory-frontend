import { Outlet } from 'react-router-dom'
import { HeroIcons } from '../components/ui/heroicons'
import { ProfileButton } from '../components/profile-button'
import { useForm } from 'react-hook-form'
import { useProducts } from '../context/products'
import { useEffect } from 'react'

interface form {
  search: string
}

export const MainLayout = () => {
  const { register, watch } = useForm<form>()
  const { filterByName } = useProducts()

  useEffect(() => {
    const subscription = watch((value) => {
      const { search } = value

      filterByName(search)
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <div className="flex-col h-screen">
      <div className="md:h-16 flex justify-between py-2 px-5 border-b sticky top-1 z-10 bg-white">
        <div className="md:w-10 bg-blue-400"></div> {/* WEBSITE ICON */}
        <div className="flex gap-2 px-2 border-2 rounded-l-xl rounded-r-xl border-gray-200 h-[80%] w-96 items-center my-auto">
          <HeroIcons name="MagnifyingGlassIcon" />

          <textarea
            className="my-auto h-[80%] text-justify w-full placeholder-gray-400 text-black resize-none focus:outline-none"
            placeholder="Buscar productos"
            maxLength={35}
            {...register('search', {})}
          />
        </div>
        <ProfileButton />
      </div>

      <Outlet />
    </div>
  )
}
