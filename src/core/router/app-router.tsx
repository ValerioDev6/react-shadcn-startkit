import { isNotAuthenticatedGuard } from "@/core/guards/auth.guard"
import AdminLayout from "@/features/admin/layout/AdminLayout"
import DashboardPage from "@/features/admin/pages/DashboardPage"
import { AuthLayout } from "@/features/auth/layout/AuthLayout"
import { LoginPage } from "@/features/auth/pages/LoginPage"
import { RegisterHeroePage } from "@/features/pokemons/pages/heroe-register/RegisterHeroPage"
import { SearchHeroePage } from "@/features/pokemons/pages/heroe-search/SearchHeroPage"
import { HeroeListPage } from "@/features/pokemons/pages/pokemon-list/PokemonListPage"
import TaskListPage from "@/features/tasks/pages/TaskListPage"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: (
      <>
        {isNotAuthenticatedGuard()}
        <AuthLayout />
      </>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "",
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "heroes",
        children: [
          {
            path: "",
            element: <HeroeListPage />,
          },
          {
            path: "register",
            element: <RegisterHeroePage />,
          },
          {
            path: "search",
            element: <SearchHeroePage />,
          },
        ],
      },
      {
        path: "tasks",
        children: [
          {
            path: "",
            element: <TaskListPage />,
          },
        ],
      },
      {
        path: "",
        element: <Navigate to="/admin/dashboard" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
