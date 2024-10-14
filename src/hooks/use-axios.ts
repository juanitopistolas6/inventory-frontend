import Axios from 'axios'
import Cookies from 'js-cookie'

export const useAxios = () => {
  const axios = Axios.create({
    baseURL: 'http://localhost:3000',
  })

  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token')

      if (!token) throw new Error('Token not found')

      config.headers['Authorization'] = `Bearer ${token}`

      return config
    },
    (error) => {
      console.log('no se ha podido')
      return Promise.reject(error)
    }
  )

  return { axios }
}
