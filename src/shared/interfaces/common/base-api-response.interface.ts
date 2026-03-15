export interface BaseApiResponse<T> {
  isSuccess: boolean
  message: string
  data: T
  errors?: unknown[]
  statusCode: number
}
