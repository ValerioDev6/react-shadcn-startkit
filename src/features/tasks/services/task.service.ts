import { BASE_API } from "@/core/common/axios"
import type { BaseApiResponse } from "@/shared/interfaces/common/base-api-response.interface"
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
    } catch (error) {
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
