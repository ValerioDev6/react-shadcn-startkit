import { Link } from "react-router"

export const HeroeListPage = () => {
  const heroes = [
    { id: 1, name: "Spiderman", poder: "Sentido arácnido" },
    { id: 2, name: "Batman", poder: "Artes marciales" },
  ]

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lista de Heroes</h1>
        <Link
          to="/admin/heroes/register"
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Nuevo Heroe
        </Link>
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
            {heroes.map((heroe) => (
              <tr key={heroe.id}>
                <td className="px-6 py-4 whitespace-nowrap">{heroe.id}</td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {heroe.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{heroe.poder}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/admin/heroes/search?id=${heroe.id}`}
                    className="mr-3 text-indigo-600 hover:text-indigo-900"
                  >
                    Ver
                  </Link>
                  <button className="text-red-600 hover:text-red-900">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
