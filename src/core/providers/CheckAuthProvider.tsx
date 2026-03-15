// core/providers/CheckAuthProvider.tsx
import { CustomFullScreenLoading } from "@/shared/components/custom/CustomFullScreenLoading"
import { type PropsWithChildren, useEffect } from "react"
import { useAuthStore } from "../store/auth.store"

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus, authStatus } = useAuthStore()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  if (authStatus === "checking") return <CustomFullScreenLoading />
  return children
}
