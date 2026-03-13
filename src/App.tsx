import { BrowserRouter } from "react-router"
import { AppRoutes } from "./core/router/app-router"

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
