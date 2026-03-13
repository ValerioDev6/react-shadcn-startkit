import { useState } from "react"
import { useSearchParams } from "react-router"

export const SearchHeroePage = () => {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")

  const heroes = [
    { id: 1, name: "Spiderman", poder: "Sentido arácnido" },
    { id: 2, name: "Batman", poder: "Artes marciales" },
    { id: 3, name: "Superman", poder: "Fuerza sobrehumana" },
  ]

  const filteredHeroes = heroes.filter((heroe) =>
    heroe.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Buscar Heroe</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Poder
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredHeroes.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No se encontraron heroes
                </td>
              </tr>
            ) : (
              filteredHeroes.map((heroe) => (
                <tr key={heroe.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{heroe.id}</td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {heroe.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{heroe.poder}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="mr-3 text-indigo-600 hover:text-indigo-900">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
