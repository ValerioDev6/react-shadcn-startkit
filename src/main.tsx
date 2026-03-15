import { ThemeProvider } from "@/components/theme-provider"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { Toaster } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
