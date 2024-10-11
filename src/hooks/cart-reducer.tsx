import { ICart, IResponse } from '../util/interfaces'
import { useAxios } from './use-axios'

interface Payload {
  id: string
  units: number
}

interface cartState {
  cart: ICart
}

interface cartPayload {
  action: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'GET_CART'
  payload: Payload
}

const { axios } = useAxios()

export async function intialValie() {
  const response = await axios.get<IResponse<ICart>>('/cart')

  const { data } = response.data

  return data
}

export function cartReducer(state: cartState, payload: cartPayload) {
  const { action, payload: cartPayload } = payload

  switch (action) {
    case 'ADD_TO_CART':
      break
    case 'GET_CART':
      break
    case 'REMOVE_FROM_CART':
      break
    default:
      return state
  }
}
