import { AdminRoutes } from "@/features/admin/admin.routes"
import { AuthRoutes } from "@/features/auth/auth.routes"
import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router"
import { useAuthStore } from "../store/auth.store"

export const AppRoutes = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  )
}
