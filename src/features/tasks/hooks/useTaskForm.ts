import { taskService } from "@/features/tasks/services/task.service"
import type { BaseApiResponse } from "@/shared/interfaces/common/base-api-response.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const createTaskSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string().optional(),
})

export type CreateTaskFormData = z.infer<typeof createTaskSchema>

export function useTaskForm(onSuccess: () => void, onClose?: () => void) {
  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const onSubmit = async (data: CreateTaskFormData) => {
    setIsLoading(true)
    setServerError(null)

    const response = await taskService.createTask({
      title: data.title,
      description: data.description || "",
    })

    if (response.isSuccess) {
      toast.success("Tarea creada correctamente")
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
