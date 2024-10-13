import { IProduct } from './product'

export interface ICartProduct {
  product: IProduct
  units: number
}

export interface ICart {
  _id: string
  idCustomer: string
  cart: ICartProduct[]
}
