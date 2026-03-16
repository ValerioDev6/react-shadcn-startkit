export interface ITasks {
  items: ITask[]
  info: Info
}

export interface Info {
  page: number
  limit: number
  total: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  next?: number
  prev?: number
}

export interface ITask {
  id: string
  title: string
  description: string
  completed: boolean
  userId: string
  createdAt: string
  updatedAt: string
}
