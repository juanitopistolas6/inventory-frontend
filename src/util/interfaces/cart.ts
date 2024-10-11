import { IProduct } from './product'

interface ICartProduct extends IProduct {
  units: number
}

export interface ICart {
  _id: string
  idCustomer: string
  cart: ICartProduct[]
}
