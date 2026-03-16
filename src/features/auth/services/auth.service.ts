import { BASE_API } from "@/core/common/axios"
import type { BaseApiResponse } from "@/shared/interfaces/common/base-api-response.interface"
import type { IUser } from "../interfaces/auth.interface"

export class AuthService {
  async login(email: string, password: string) {
    const { data } = await BASE_API.post<BaseApiResponse<IUser>>(
      "/auth/login",
      { email, password }
    )
    return data.data
  }

  async checkAuthStatus() {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No token found")
    const { data } = await BASE_API.get<BaseApiResponse<IUser>>("/auth/me")
    return data.data
  }
}
