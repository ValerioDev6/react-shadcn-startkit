import AppSidebar from "@/components/layout/app-sidebar"
import { Button } from "@/components/ui/button"
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { LayoutProvider } from "@/core/context/layout-provider"
import { PanelLeft } from "lucide-react"
import { Outlet } from "react-router"

const AdminLayout = () => {
  return (
    <LayoutProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AdminLayoutInner />
        </SidebarProvider>
      </TooltipProvider>
    </LayoutProvider>
  )
}
const AdminLayoutInner = () => {
  const { open, setOpen } = useSidebar()
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 lg:h-[60px]">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setOpen(!open)}
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-end gap-2" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
