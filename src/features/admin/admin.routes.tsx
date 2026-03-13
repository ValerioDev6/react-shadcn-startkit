import { useAuthStore } from "@/core/store/auth.store"
import { Navigate, Route, Routes } from "react-router"
import { HeroesRoutes } from "../heroes/heroe.routes"
import AdminLayout from "./layout/AdminLayout"
import DashboardPage from "./pages/DashboardPage"

export const AdminRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/heroes/*" element={<HeroesRoutes />} />
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  )
}
