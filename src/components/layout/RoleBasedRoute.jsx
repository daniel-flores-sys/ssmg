import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function RoleBasedRoute({ requiredRoles, children }) {
  const { estaAutenticado, rolActivo, cargando } = useAuth()

  if (cargando) return null

  if (!estaAutenticado) return <Navigate to="/login" replace />

  if (requiredRoles && !requiredRoles.includes(rolActivo)) {
    return <Navigate to="/dashboard" replace />
  }

  return children ?? <Outlet />
}
