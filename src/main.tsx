import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { InventoryAdminApp } from "./InventoryAdminApp"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InventoryAdminApp />
  </StrictMode>
)
