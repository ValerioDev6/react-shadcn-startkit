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

  async checkAuthStatus() {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No token found")
    try {
      const { data } = await BASE_API.get("/auth/check-status")
      return data
    } catch (error) {
      throw error
    }
  }
}
