export interface IResponse<T> {
  status: Number
  message: string
  data: T
}

export interface Token {
  token: string
}
