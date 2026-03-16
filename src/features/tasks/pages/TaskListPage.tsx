import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pagination } from "@/shared/components/Pagination"
import { usePagination } from "@/shared/hooks/usePagination"
import { Eye, Pencil, Plus, Trash2, X } from "lucide-react"
import { useState } from "react"
import { CreateTaskDialog } from "../components/CreateTaskDialog"
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog"
import { UpdateTaskDialog } from "../components/UpdateTaskDialog"
import { useTasks } from "../hooks/useTasks"

const TaskListPage = () => {
  const [search, setSearch] = useState("")
  const { page, limit, setPage, setLimit } = usePagination({ initialLimit: 10 })
  const { tasks, info, loading, error, refetch } = useTasks(search, page, limit)
  const [searchInput, setSearchInput] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editTaskId, setEditTaskId] = useState<string | null>(null)
  const [deleteTask, setDeleteTask] = useState<{
    id: string
    title: string
  } | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const handleClearFilters = () => {
    setSearchInput("")
    setSearch("")
    setPage(1)
  }

  const handleView = (id: string) => {
    console.log("View task:", id)
  }

  const handleEdit = (id: string) => {
    setEditTaskId(id)
  }

  const handleDelete = (id: string, title: string) => {
    setDeleteTask({ id, title })
  }

  const handleCreate = () => {
    setIsCreateDialogOpen(true)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <p className="text-muted-foreground">Cargando tareas...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <p className="text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/tasks">Tareas</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestion de Tareas</CardTitle>
          <Button size="lg" onClick={handleCreate}>
            <Plus /> Nueva Tarea
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="mb-4 flex gap-2">
            <Input
              placeholder="Buscar tareas..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="max-w-sm"
            />
            <Button type="submit" variant="secondary">
              Buscar
            </Button>
            {(search || searchInput) && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleClearFilters}
              >
                <X className="mr-1 h-4 w-4" />
                Limpiar
              </Button>
            )}
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titulo</TableHead>
                <TableHead>Descripcion</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No hay tareas
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {task.description}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {task.createdAt}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(task.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(task.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(task.id, task.title)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {info && (
            <Pagination
              currentPage={page}
              totalPages={info.totalPages}
              limit={limit}
              total={info.total}
              onPageChange={setPage}
              onLimitChange={setLimit}
            />
          )}
        </CardContent>
      </Card>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={refetch}
      />

      <UpdateTaskDialog
        taskId={editTaskId}
        open={!!editTaskId}
        onOpenChange={(open) => !open && setEditTaskId(null)}
        onSuccess={refetch}
      />

      <DeleteConfirmDialog
        taskId={deleteTask?.id || null}
        taskTitle={deleteTask?.title || ""}
        open={!!deleteTask}
        onOpenChange={(open) => !open && setDeleteTask(null)}
        onSuccess={refetch}
      />
    </div>
  )
}

export default TaskListPage
