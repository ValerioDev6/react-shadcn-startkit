import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/core/store/auth.store"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

export const LoginPage = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState("valerioemail954@gmail.com")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        navigate("/admin/dashboard", { replace: true })
      } else {
        toast.warning("Credenciales inválidas", {
          position: "top-right",
        })
      }
    } catch {
      toast.warning("Credenciales inválidas")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tu email y contraseña para acceder al panel de administración
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="underline-offset-4 hover:underline">
            Regístrate
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
