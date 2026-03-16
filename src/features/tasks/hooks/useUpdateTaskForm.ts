import { taskService } from "@/features/tasks/services/task.service"
import type { BaseApiResponse } from "@/shared/interfaces/common/base-api-response.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const updateTaskSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  completed: z.boolean(),
})

export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>

export function useUpdateTaskForm(
  taskId: string,
  initialData: { title: string; description: string; completed: boolean },
  onSuccess: () => void,
  onClose?: () => void
) {
  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<UpdateTaskFormData>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description || "",
      completed: initialData.completed,
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const onSubmit = async (data: UpdateTaskFormData) => {
    setIsLoading(true)
    setServerError(null)

    const response = await taskService.updatedTaks(
      {
        title: data.title,
        description: data.description,
      },
      taskId
    )

    if (response.isSuccess) {
      toast.success("Tarea actualizada correctamente")
      reset()
      onSuccess()
      onClose?.()
    } else {
      const apiResponse = response as BaseApiResponse<unknown>
      if (apiResponse.errors && apiResponse.errors.length > 0) {
        apiResponse.errors.forEach((error) => toast.error(String(error)))
      } else {
        setServerError(response.message)
        toast.error(response.message)
      }
    }

    setIsLoading(false)
  }

  const close = () => {
    reset()
    setServerError(null)
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    reset,
    setValue,
    watch,
    trigger,
    errors,
    isLoading,
    serverError,
    close,
  }
}
