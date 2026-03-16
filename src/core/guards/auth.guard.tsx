import type { PropsWithChildren } from "react"
import { Navigate } from "react-router"
import { useAuthStore } from "../store/auth.store"
import { Loader2 } from "lucide-react"

const LoadingSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)

export const IsAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const authStatus = useAuthStore((state) => state.authStatus)

  if (authStatus === "checking") {
    return <LoadingSpinner />
  }

  if (authStatus === "not-authenticated") {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

export const IsNotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const authStatus = useAuthStore((state) => state.authStatus)

  if (authStatus === "checking") {
    return <LoadingSpinner />
  }

  if (authStatus === "authenticated") {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}
