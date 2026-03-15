import type { PropsWithChildren } from "react"
import { Navigate } from "react-router"
import { useAuthStore } from "../store/auth.store"

// 👇 named export, sin default
export const IsAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore()
  if (authStatus === "checking") return null
  if (authStatus === "not-authenticated") return <Navigate to="/auth/login" />
  return children
}

// 👇 named export, sin default
export const IsNotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore()
  if (authStatus === "checking") return null
  if (authStatus === "authenticated") return <Navigate to="/admin/dashboard" />
  return children
}

// export const AdminRoute = ({ children }: PropsWithChildren) => {
//   const { authStatus, isAdmin } = useAuthStore()

//   if (authStatus === "checking") return null

//   if (authStatus === "not-authenticated") return <Navigate to="/auth/login" />

//   if (!isAdmin()) return <Navigate to="/" />

//   return children
// }
