import { status } from '@grpc/grpc-js'

export interface CustomExceptionDetails {
  type: string
  details: string
  domain: string
}
export interface CustomException<T> {
  code: status
  details: T
}
