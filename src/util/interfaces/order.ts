import { ICartProduct } from './cart'

export interface IOrder {
  _id: string
  userId: string
  amount: number
  items: ICartProduct[]
}
