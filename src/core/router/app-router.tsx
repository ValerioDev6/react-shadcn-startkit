import DashboardPage from "@/features/admin/pages/DashboardPage"
import { LoginPage } from "@/features/auth/pages/LoginPage"
import { RegisterHeroePage } from "@/features/pokemons/pages/heroe-register/RegisterHeroPage"
import { SearchHeroePage } from "@/features/pokemons/pages/heroe-search/SearchHeroPage"
import { HeroeListPage } from "@/features/pokemons/pages/pokemon-list/PokemonListPage"
import TaskListPage from "@/features/tasks/pages/TaskListPage"
import { lazy } from "react"

import { createBrowserRouter, Navigate } from "react-router"
import {
  IsAuthenticatedRoute,
  IsNotAuthenticatedRoute,
} from "../guards/auth.guard"

const AuthLayout = lazy(() => import("@/features/auth/layout/AuthLayout"))
const AdminLayout = lazy(() => import("@/features/admin/layout/AdminLayout"))

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: (
      <IsNotAuthenticatedRoute>
        <AuthLayout />
      </IsNotAuthenticatedRoute>
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
    element: (
      <IsAuthenticatedRoute>
        <AdminLayout />
      </IsAuthenticatedRoute>
    ),
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
