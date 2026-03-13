import { Navigate, Route, Routes } from "react-router"
import { HeroeListPage } from "./pages/heroe-list/HeroesListPage"
import { RegisterHeroePage } from "./pages/heroe-register/RegisterHeroPage"
import { SearchHeroePage } from "./pages/heroe-search/SearchHeroPage"

export const HeroesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<HeroeListPage />} />
      <Route path="register" element={<RegisterHeroePage />} />
      <Route path="search" element={<SearchHeroePage />} />
      <Route path="/" element={<Navigate to="/admin/heroes" replace />} />
    </Routes>
  )
}
