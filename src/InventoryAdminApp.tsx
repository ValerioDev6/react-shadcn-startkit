import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { appRouter } from "@/core/router/app-router"
import { RouterProvider } from "react-router"
import { Toaster } from "sonner"

export const InventoryAdminApp = () => {
  return (
    <ThemeProvider>
      {/* <QueryClientProvider client={queryClient}> */}
      <TooltipProvider>
        <Toaster />
        {/* <CheckAuthProvider> */}
        <RouterProvider router={appRouter} />

        {/* </CheckAuthProvider> */}
      </TooltipProvider>
      {/* </QueryClientProvider> */}
    </ThemeProvider>
  )
}
