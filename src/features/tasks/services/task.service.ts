import { BASE_API } from "@/core/common/axios"
import type { BaseApiResponse } from "@/shared/interfaces/common/base-api-response.interface"
import type { ITaskById } from "../interfaces/task.interface"
import type { ITask, ITasks } from "../interfaces/tasks.interface"

export class TaskService {
  async getAllTasks(
    search: string,
    page?: number,
    limit?: number
  ): Promise<BaseApiResponse<ITasks>> {
    try {
      const response = await BASE_API.get<BaseApiResponse<ITasks>>("/tasks", {
        params: {
          search,
          page,
          limit,
        },
      })

      return response.data
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { status: number; data?: BaseApiResponse<ITasks> }
      }

      if (axiosError.response?.status === 404) {
        return {
          isSuccess: true,
          message:
            axiosError.response.data?.message || "No se encontraron tareas",
          data: { items: [], info: {} as ITasks["info"] },
          statusCode: 404,
        }
      }

      return {
        isSuccess: false,
        message: `Error al obtener las tareas: ${error}`,
        data: { items: [], info: {} as ITasks["info"] },
        statusCode: 500,
      }
    }
  }

  async createTask(task: {
    title: string
    description: string
  }): Promise<BaseApiResponse<ITask>> {
    try {
      const response = await BASE_API.post<BaseApiResponse<ITask>>(
        "/tasks",
        task
      )
      return response.data
    } catch (error) {
      return {
        isSuccess: false,
        message: `Error al crear la tarea: ${error}`,
        data: {} as ITask,
        statusCode: 500,
      }
    }
  }

  async getBytIdTasks(id: string): Promise<BaseApiResponse<ITaskById>> {
    try {
      const response = await BASE_API.get<BaseApiResponse<ITaskById>>(
        `/tasks/${id}`
      )
      return response.data
    } catch (error) {
      return {
        isSuccess: false,
        message: `Error al eliminar la tarea: ${error}`,
        data: null!,
        statusCode: 500,
      }
    }
  }

  async updatedTaks(
    task: {
      title?: string
      description?: string
    },
    id: string
  ): Promise<BaseApiResponse<ITask>> {
    try {
      const response = await BASE_API.patch<BaseApiResponse<ITask>>(
        `/tasks/${id}`,
        task
      )
      return response.data
    } catch (error) {
      return {
        isSuccess: false,
        message: `Error al actualizar la tarea: ${error}`,
        data: {} as ITask,
        statusCode: 500,
      }
    }
  }

  async toggleTask(
    id: string,
    completed: boolean
  ): Promise<BaseApiResponse<ITask>> {
    try {
      const response = await BASE_API.patch<BaseApiResponse<ITask>>(
        `/tasks/${id}`,
        { completed }
      )
      return response.data
    } catch (error) {
      return {
        isSuccess: false,
        message: `Error al actualizar la tarea: ${error}`,
        data: {} as ITask,
        statusCode: 500,
      }
    }
  }

  async deleteTask(id: string): Promise<BaseApiResponse<void>> {
    try {
      const response = await BASE_API.delete<BaseApiResponse<void>>(
        `/tasks/${id}`
      )
      return response.data
    } catch (error) {
      return {
        isSuccess: false,
        message: `Error al eliminar la tarea: ${error}`,
        data: undefined,
        statusCode: 500,
      }
    }
  }
}

export const taskService = new TaskService()
