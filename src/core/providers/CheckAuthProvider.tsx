import type { PropsWithChildren } from "react"
import { useEffect } from "react"
import { useAuthStore } from "../store/auth.store"

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus)
  const authStatus = useAuthStore((state) => state.authStatus)

  useEffect(() => {
    if (authStatus === "checking") {
      checkAuthStatus()
    }
  }, [authStatus, checkAuthStatus])

  return children
}
