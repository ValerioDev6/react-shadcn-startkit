import axios from "axios"

export const BASE_API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// 🔐 Interceptor de REQUEST → agrega el token en cada petición
BASE_API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") // o de donde guardes el token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 🔍 Interceptor para mostrar todas las respuestas
BASE_API.interceptors.response.use(
  (response) => {
    console.log(`[✅ RESPONSE] ${response.config.url}`, response.data)
    return response
  },
  (error) => {
    console.error(
      `[❌ ERROR] ${error.config?.url}`,
      error.response?.data || error.message
    )
    return Promise.reject(error)
  }
)
