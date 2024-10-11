import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import Cookies from 'js-cookie'
import { IUser } from '../util/interfaces/user'
import { UseMutateFunction, useMutation } from '@tanstack/react-query'
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
  const [user, setUser] = useState<IUser | null>(null)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const { axios } = useAxios()

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

  const { mutate: verifyToken } = useMutation<IResponse<IUser>, unknown>({
    mutationFn: async () => {
      const response = await axios.post('/auth/verify')

      return response.data
    },
    onSuccess: (data) => {
      setUser(data.data)

      setAuthenticated(true)
    },
    onError: () => {
      setUser(null)

      setAuthenticated(false)
    },
  })

  useEffect(() => {
    if (!axios.defaults.headers.common['Authorization']) {
      setAuthenticated(false)
      return
    }

    verifyToken()
  }, [])

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
