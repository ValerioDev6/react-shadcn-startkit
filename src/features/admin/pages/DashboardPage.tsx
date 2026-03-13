import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"
import { Link } from "react-router"

const stats = [
  {
    title: "Total Heroes",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Star,
  },
  {
    title: "Usuarios Activos",
    value: "5,678",
    change: "+8%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Visitas Hoy",
    value: "12,345",
    change: "-3%",
    trend: "down",
    icon: Activity,
  },
  {
    title: "Nuevos Registros",
    value: "89",
    change: "+23%",
    trend: "up",
    icon: Calendar,
  },
]

const recentHeroes = [
  { id: 1, name: "Spider-Man", publisher: "Marvel", power: "Sentido arácnido" },
  { id: 2, name: "Batman", publisher: "DC", power: "Artes marciales" },
  { id: 3, name: "Superman", publisher: "DC", power: "Fuerza sobrehumana" },
  { id: 4, name: "Iron Man", publisher: "Marvel", power: "Tecnología" },
  { id: 5, name: "Wonder Woman", publisher: "DC", power: "Superfuerza" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground lg:text-2xl">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Bienvenido de nuevo. Aquí está lo que está pasando.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Exportar
          </Button>
          <Button asChild size="sm">
            <Link to="/admin/heroes/register">
              <Star className="mr-2 h-4 w-4" />
              Nuevo Heroe
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  stat.trend === "up"
                    ? "bg-green-100 dark:bg-green-900/20"
                    : "bg-red-100 dark:bg-red-900/20"
                )}
              >
                <stat.icon
                  className={cn(
                    "h-4 w-4",
                    stat.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600 dark:text-green-400" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600 dark:text-red-400" />
                )}
                <span
                  className={
                    stat.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">
                  desde el mes pasado
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Heroes - Takes 4 columns on large screens */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Heroes Recientes</CardTitle>
              <CardDescription className="mt-1">
                Los últimos heroes agregados al sistema.
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/heroes">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentHeroes.map((heroe) => (
                <div
                  key={heroe.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{heroe.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {heroe.publisher} • {heroe.power}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overview - Takes 3 columns on large screens */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
            <CardDescription>Distribución por publisher.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bars */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span>Marvel</span>
                  </div>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[45%] rounded-full bg-blue-500" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500" />
                    <span>DC</span>
                  </div>
                  <span className="font-medium">35%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[35%] rounded-full bg-purple-500" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span>Otros</span>
                  </div>
                  <span className="font-medium">20%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[20%] rounded-full bg-green-500" />
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="rounded-lg border bg-primary/5 p-4">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-600 dark:text-green-400">
                  +15%
                </span>
                <span className="text-muted-foreground">
                  más heroes este mes
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
