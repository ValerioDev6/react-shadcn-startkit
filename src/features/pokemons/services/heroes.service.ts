import { BASE_API } from "@/core/common/axios"

export class PokemonsService {
  async getAllHeroes(search: string, page?: number) {
    try {
      const { data } = await BASE_API.get("/api/heroes", {
        params: {
          search,
          page,
        },
      })

      return {
        ok: true,
        data: data,
      }
    } catch (error) {
      return {
        ok: false,
        message: `Error al obtener los heroes: ${error}`,
      }
    }
  }
}
