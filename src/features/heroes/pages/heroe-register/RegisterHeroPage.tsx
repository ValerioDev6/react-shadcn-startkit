import { useState } from "react"
import { useNavigate } from "react-router"

export const RegisterHeroePage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    poder: "",
    edad: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Heroe registrado:", formData)
    navigate("/admin/heroes")
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Registrar Heroe</h1>
      <div className="max-w-lg rounded-lg bg-white p-6 shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Poder
            </label>
            <input
              type="text"
              value={formData.poder}
              onChange={(e) =>
                setFormData({ ...formData, poder: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Edad
            </label>
            <input
              type="number"
              value={formData.edad}
              onChange={(e) =>
                setFormData({ ...formData, edad: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/heroes")}
              className="flex-1 rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
