import { taskService } from "@/features/tasks/services/task.service"
import { useState } from "react"
import { toast } from "sonner"

export function useDeleteTask(onSuccess: () => void) {
  const [isLoading, setIsLoading] = useState(false)

  const deleteTask = async (id: string) => {
    setIsLoading(true)

    const response = await taskService.deleteTask(id)

    if (response.isSuccess) {
      toast.success("Tarea eliminada correctamente")
      onSuccess()
    } else {
      toast.error(response.message)
    }

    setIsLoading(false)
  }

  return {
    deleteTask,
    isLoading,
  }
}
