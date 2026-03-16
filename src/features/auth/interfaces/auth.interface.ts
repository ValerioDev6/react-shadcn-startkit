export interface IUser {
  token: string
  user: User
}

export interface User {
  id: string
  email: string
  name: string
  country: string | null
  role: string
}
