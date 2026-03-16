import type { User } from "@/features/auth/interfaces/auth.interface"
import { AuthService } from "@/features/auth/services/auth.service"
import { create } from "zustand"

const authService = new AuthService()

type AuthStatus = "authenticated" | "not-authenticated" | "checking"

interface AuthState {
  token: string | null
  user: User | null
  authStatus: AuthStatus
  isAdmin: () => boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuthStatus: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",

  isAdmin: () => {
    const roles = get().user?.role || ""
    return roles.includes("ADMIN")
  },

  login: async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password)
      localStorage.setItem("token", data.token)
      set({
        user: data.user,
        token: data.token,
        authStatus: "authenticated",
      })
      return true
    } catch {
      localStorage.removeItem("token")
      set({ user: null, token: null, authStatus: "not-authenticated" })
      return false
    }
  },

  logout: () => {
    localStorage.removeItem("token")
    set({ user: null, token: null, authStatus: "not-authenticated" })
  },

  checkAuthStatus: async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      set({ authStatus: "not-authenticated" })
      return
    }

    try {
      const data = await authService.checkAuthStatus()
      set({
        user: data.user,
        token: data.token,
        authStatus: "authenticated",
      })
    } catch {
      localStorage.removeItem("token")
      set({ user: null, token: null, authStatus: "not-authenticated" })
    }
  },
}))
