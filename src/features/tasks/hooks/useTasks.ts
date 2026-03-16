import type { BaseApiResponse } from "@/shared/interfaces/common/base-api-response.interface"
import { useEffect, useState } from "react"
import type { ITask, ITasks } from "../interfaces/tasks.interface"
import { taskService } from "../services/task.service"

interface UseTasksReturn {
  tasks: ITask[]
  info: ITasks["info"] | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useTasks(
  search: string = "",
  page?: number,
  limit?: number
): UseTasksReturn {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [info, setInfo] = useState<ITasks["info"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchTasks() {
      setLoading(true)
      setError(null)

      const response: BaseApiResponse<ITasks> = await taskService.getAllTasks(
        search,
        page,
        limit
      )

      if (cancelled) return

      if (response.isSuccess) {
        setTasks(response.data.items)
        setInfo(response.data.info)
      } else {
        setError(response.message)
      }

      setLoading(false)
    }

    fetchTasks()

    return () => {
      cancelled = true
    }
  }, [search, page, limit])

  const refetch = async () => {
    setLoading(true)
    setError(null)

    const response: BaseApiResponse<ITasks> = await taskService.getAllTasks(
      search,
      page,
      limit
    )

    if (response.isSuccess) {
      setTasks(response.data.items)
      setInfo(response.data.info)
    } else {
      setError(response.message)
    }

    setLoading(false)
  }

  return {
    tasks,
    info,
    loading,
    error,
    refetch,
  }
}
