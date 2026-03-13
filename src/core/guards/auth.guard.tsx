import { Navigate, useLocation } from "react-router"
import { useAuthStore } from "../store/auth.store"

export const isAuthenticatedGuard = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }
  return null
}

export const isNotAuthenticatedGuard = () => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }
  return null
}

export const useAuthGuard = () => {
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated && location.pathname !== "/auth/login") {
    return <Navigate to="/auth/login" replace />
  }

  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    return <Navigate to="/admin" replace />
  }

  return null
}
