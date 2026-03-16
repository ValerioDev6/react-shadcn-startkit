import DashboardPage from "@/features/admin/pages/DashboardPage"
import { LoginPage } from "@/features/auth/pages/LoginPage"
import TaskListPage from "@/features/tasks/pages/TaskListPage"
import { lazy } from "react"

import RegisterPage from "@/features/auth/pages/RegisterPage"
import TaskRegisterPage from "@/features/tasks/pages/TaskRegisterPage"
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
        path: "register",
        element: <RegisterPage />,
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
        path: "tasks",
        children: [
          {
            path: "",
            element: <TaskListPage />,
          },
          {
            path: "register",
            element: <TaskRegisterPage />,
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
