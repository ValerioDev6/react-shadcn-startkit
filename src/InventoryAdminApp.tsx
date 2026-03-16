import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CheckAuthProvider } from "@/core/providers/CheckAuthProvider"
import { appRouter } from "@/core/router/app-router"
import { RouterProvider } from "react-router"
import { Toaster } from "sonner"

export const InventoryAdminApp = () => {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Toaster position="top-right" />
        <CheckAuthProvider>
          <RouterProvider router={appRouter} />
        </CheckAuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
