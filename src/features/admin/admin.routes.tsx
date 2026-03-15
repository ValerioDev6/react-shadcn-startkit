// export const AdminRoutes = () => {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" replace />
//   }

//   return (
//     <Routes>
//       <Route element={<AuthenticatedLayout />}>
//         <Route path="dashboard" element={<DashboardPage />} />
//         <Route path="heroes/*" element={<HeroesRoutes />} />
//         <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
//       </Route>
//     </Routes>
//   )
// }
// export const AdminRoutes = () => {
//   return (
//     <Routes>
//       <Route element={<AuthenticatedLayout />}>
//         <Route path="dashboard" element={<DashboardPage />} />
//         <Route path="heroes/*" element={<HeroesRoutes />} />
//         <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
//       </Route>
//     </Routes>
//   )
// }
