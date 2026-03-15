import { BASE_API } from "@/core/common/axios"

export class AuthService {
  async login(email: string, password: string) {
    try {
      const { data } = await BASE_API.post("/auth/login", { email, password })
      return data
    } catch (error) {
      throw error
    }
  }
}
