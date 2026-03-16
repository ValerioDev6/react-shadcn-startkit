import { taskService } from "@/features/tasks/services/task.service"
import { useState } from "react"
import type { ITaskById } from "../interfaces/task.interface"

export function useTaskById() {
  const [task, setTask] = useState<ITaskById | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTask = async (id: string) => {
    setLoading(true)
    setError(null)

    const response = await taskService.getBytIdTasks(id)

    if (response.isSuccess && response.data) {
      setTask(response.data)
    } else {
      setError(response.message)
      setTask(null)
    }

    setLoading(false)
  }

  const reset = () => {
    setTask(null)
    setError(null)
  }

  return {
    task,
    loading,
    error,
    fetchTask,
    reset,
  }
}
