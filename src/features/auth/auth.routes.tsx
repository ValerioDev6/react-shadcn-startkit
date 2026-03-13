import { Navigate, Route, Routes } from "react-router"
import { AuthLayout } from "./layout/AuthLayout"
import { LoginPage } from "./pages/LoginPage"

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="" element={<Navigate to="/auth/login" replace />} />
      </Route>
    </Routes>
  )
}
