import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import Cookies from 'js-cookie'
import { IUser } from '../util/interfaces/user'
import { UseMutateFunction, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import { ILogin } from '../util/interfaces/context'
import { IResponse, ITokenUser } from '../util/interfaces'
import { useAxios } from '../hooks/use-axios'

interface authProp {
  user: IUser | null
  login: UseMutateFunction<IResponse<ITokenUser>, unknown, ILogin, unknown>
  setError: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean
  error: boolean
  axios: AxiosInstance
}

const authContext = createContext<authProp | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { axios } = useAxios()
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const { mutate: login } = useMutation<IResponse<ITokenUser>, unknown, ILogin>(
    {
      mutationFn: async ({ user, password }: ILogin) => {
        const response = await axios.post('/auth/login', {
          user,
          password,
        })

        return response.data
      },
      onSuccess: (data) => {
        const { data: loginData } = data

        setUser(loginData.user)

        Cookies.set('token', loginData.token)

        setAuthenticated(true)
      },
      onError: () => {
        setUser(null)

        setError(true)

        setAuthenticated(false)
      },
    }
  )

  const { data: tokenData, isSuccess } = useQuery<IResponse<IUser>>({
    enabled: !!Cookies.get('token'),
    queryKey: ['token'],
    queryFn: async () => {
      const response = await axios.post<IResponse<IUser>>('/auth/verify')

      return response.data
    },
  })

  useEffect(() => {
    if (!isSuccess) return

    if (!tokenData) {
      console.log('no logeado')
      setUser(null)
      setAuthenticated(false)
      setError(true)
      return
    }

    setUser(tokenData.data)
    setError(false)
    setAuthenticated(true)
  }, [isSuccess])

  const value: authProp = {
    login,
    user,
    isAuthenticated,
    error,
    setError,
    axios,
  }

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export const useAuth = () => {
  const context = useContext(authContext)

  if (!context) throw new Error('authContext must be withtin its reach')

  return context
}
