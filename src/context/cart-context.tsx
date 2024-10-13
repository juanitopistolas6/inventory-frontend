import {
  createContext,
  ReactNode,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
} from 'react'
import { cartPayload, cartReducer, cartState } from '../hooks/cart-reducer'
import { useAxios } from '../hooks/use-axios'
import { UseMutateFunction, useMutation } from '@tanstack/react-query'
import { ICart, IProduct, IResponse } from '../util/interfaces'

interface IContextCart {
  dispatch: Dispatch<cartPayload>
  state: cartState
  addToCart: UseMutateFunction<IResponse<ICart>, unknown, IProduct, unknown>
  removeFromCart: UseMutateFunction<
    IResponse<ICart>,
    unknown,
    IProduct,
    unknown
  >
  getCart: UseMutateFunction<IResponse<ICart>, Error, void, unknown>
}

const cartContext = createContext<IContextCart | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    error: false,
  })
  const { axios } = useAxios()

  useEffect(() => {
    getCart()
  }, [])

  const { mutate: addToCart } = useMutation<
    IResponse<ICart>,
    unknown,
    IProduct
  >({
    mutationFn: async (product: IProduct) => {
      const payload = { id: product._id, units: 1 }

      const response = await axios.put<IResponse<ICart>>('/cart', payload)

      return response.data
    },
    onSuccess: (data, product) => {
      if (data.status !== 200) {
        dispatch({ action: 'FETCH_ERROR' })
        return
      }

      dispatch({ action: 'ADD_TO_CART', payload: { product, units: 1 } })
    },
    onError: () => {
      dispatch({ action: 'FETCH_ERROR' })
    },
  })

  const { mutate: removeFromCart } = useMutation<
    IResponse<ICart>,
    unknown,
    IProduct
  >({
    mutationFn: async (product) => {
      const payload = { id: product._id, units: 1 }

      const response = await axios.delete('/cart', { data: payload })

      return response.data
    },
    onSuccess: (data, product) => {
      if (data.status !== 200) {
        dispatch({ action: 'FETCH_ERROR' })
        return
      }

      dispatch({ action: 'REMOVE_FROM_CART', payload: { product, units: 1 } })
    },
    onError: () => {
      dispatch({ action: 'FETCH_ERROR' })
    },
  })

  const { mutate: getCart } = useMutation<IResponse<ICart>>({
    mutationFn: async () => {
      const response = await axios.get('/cart')

      return response.data
    },
    onSuccess: (data) => {
      if (data.status !== 200) {
        dispatch({ action: 'FETCH_ERROR' })
        return
      }

      dispatch({ action: 'GET_CART', payload: data.data })
    },
    onError: () => {
      dispatch({ action: 'FETCH_ERROR' })
    },
  })

  const value: IContextCart = {
    state,
    dispatch,
    addToCart,
    removeFromCart,
    getCart,
  }

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>
}

export const useCart = () => {
  const cartC = useContext(cartContext)

  if (!cartC) throw new Error('CartContext must be used within its reach')

  return cartC
}
