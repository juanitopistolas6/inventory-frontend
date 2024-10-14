import { ICart, ICartProduct, IProduct, IResponse } from '../util/interfaces'
import { useAxios } from './use-axios'

export interface cartState {
  cart: ICart | null
  error: boolean
}

export type cartPayload =
  | { action: 'ADD_TO_CART'; payload: ICartProduct }
  | { action: 'REMOVE_FROM_CART'; payload: ICartProduct }
  | { action: 'GET_CART'; payload: ICart }
  | { action: 'REMOVE_ITEM'; payload: IProduct }
  | { action: 'FETCH_ERROR' }
  | { action: 'CLEAR_CART' }

const { axios } = useAxios()

export const intialValue: () => Promise<cartState> = async () => {
  try {
    const response = await axios.get<IResponse<ICart>>('/cart')

    const { data: cart } = response.data

    if (response.data.status !== 200) return { cart: null, error: true }

    return { cart, error: false }
  } catch {
    return { cart: null, error: true }
  }
}

export function cartReducer(state: cartState, payload: cartPayload): cartState {
  const { action } = payload

  switch (action) {
    case 'ADD_TO_CART': {
      if (!state.cart) return { ...state, error: true }

      const { cart: stateCart } = state
      const { payload: product } = payload

      const itemFound = stateCart.cart.find(
        (item) => item.product._id === product.product._id
      )

      if (itemFound) {
        const updatedCart = stateCart.cart.map((item) =>
          item.product._id === product.product._id
            ? { ...item, units: item.units + 1 }
            : item
        )

        return {
          ...state,
          cart: {
            ...state.cart,
            cart: updatedCart,
          },
        }
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            cart: [...stateCart.cart, { ...product, units: 1 }],
          },
        }
      }
    }
    case 'GET_CART':
      return { cart: payload.payload, error: false }
    case 'REMOVE_FROM_CART': {
      if (!state.cart) return { ...state, error: true }

      const { cart: stateCart } = state
      const { payload: product } = payload

      const itemFound = stateCart.cart.find(
        (item) => item.product._id === product.product._id
      )

      if (itemFound) {
        const unitsToUpdate = itemFound.units - 1

        const updatedCart = unitsToUpdate
          ? stateCart.cart.map((item) =>
              item.product._id == product.product._id
                ? { ...item, units: unitsToUpdate }
                : item
            )
          : stateCart.cart.filter(
              (item) => item.product._id !== product.product._id
            )

        return {
          ...state,
          cart: {
            ...state.cart,
            cart: updatedCart,
          },
        }
      } else {
        return { ...state, error: true }
      }
    }
    case 'REMOVE_ITEM': {
      if (!state.cart) return { ...state, error: true }

      const { payload: product } = payload
      const { cart: stateCart } = state

      return {
        ...state,
        cart: {
          ...stateCart,
          cart: stateCart.cart.filter(
            (item) => item.product._id !== product._id
          ),
        },
      }
    }
    case 'CLEAR_CART': {
      if (!state.cart) return { ...state, error: true }

      const { cart: stateCart } = state

      return { ...state, cart: { ...stateCart, cart: [] } }
    }
    case 'FETCH_ERROR':
      return { ...state, error: true }
    default:
      return state
  }
}
