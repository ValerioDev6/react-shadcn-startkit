export interface ITaskById {
  id: string
  title: string
  description: string
  completed: boolean
  userId: string
  createdAt: string
  updatedAt: string
  user: User
}

export interface User {
  id: string
  name: string
  email: string
}
