import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"
import { useTaskById } from "../hooks/useTaskById"
import { useUpdateTaskForm } from "../hooks/useUpdateTaskForm"

interface UpdateTaskDialogProps {
  taskId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function UpdateTaskDialog({
  taskId,
  open,
  onOpenChange,
  onSuccess,
}: UpdateTaskDialogProps) {
  const {
    task,
    loading: loadingTask,
    fetchTask,
    reset: resetTask,
  } = useTaskById()

  useEffect(() => {
    if (taskId && open) {
      fetchTask(taskId)
    }
  }, [taskId, open])

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      resetTask()
    }
    onOpenChange(isOpen)
  }

  if (loadingTask) {
    return null
  }

  if (!task) {
    return null
  }

  return (
    <TaskFormDialog
      taskId={taskId!}
      open={open}
      onOpenChange={handleClose}
      onSuccess={onSuccess}
      initialData={{
        title: task.title,
        description: task.description,
        completed: task.completed,
      }}
    />
  )
}

interface TaskFormDialogProps {
  taskId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  initialData: {
    title: string
    description: string
    completed: boolean
  }
}

function TaskFormDialog({
  taskId,
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: TaskFormDialogProps) {
  const {
    handleSubmit,
    errors,
    isLoading,
    serverError,
    setValue,
    watch,
    trigger,
    close,
  } = useUpdateTaskForm(taskId, initialData, onSuccess, () =>
    onOpenChange(false)
  )

  const title = watch("title")
  const description = watch("description")

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarea</DialogTitle>
          <DialogDescription>Modifica los datos de la tarea</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {serverError && (
              <div className="rounded bg-red-50 p-3 text-sm text-red-500">
                {serverError}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Ingresa el título de la tarea"
                value={title}
                onChange={(e) => {
                  setValue("title", e.target.value)
                  trigger("title")
                }}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                placeholder="Ingresa la descripción (opcional)"
                value={description}
                onChange={(e) => {
                  setValue("description", e.target.value)
                  trigger("description")
                }}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
