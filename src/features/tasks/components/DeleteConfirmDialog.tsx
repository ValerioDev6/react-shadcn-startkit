import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteTask } from "../hooks/useDeleteTask"

interface DeleteConfirmDialogProps {
  taskId: string | null
  taskTitle: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function DeleteConfirmDialog({
  taskId,
  taskTitle,
  open,
  onOpenChange,
  onSuccess,
}: DeleteConfirmDialogProps) {
  const { deleteTask, isLoading } = useDeleteTask(onSuccess)

  const handleConfirm = () => {
    if (taskId) {
      deleteTask(taskId)
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. La tarea "{taskTitle}" será
            eliminada permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
