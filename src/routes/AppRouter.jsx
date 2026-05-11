import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import RoleBasedRoute from '@/components/layout/RoleBasedRoute'
import Layout from '@/components/layout/Layout'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import ProyectosPage from '@/pages/ProyectosPage'
import DetalleProyectoPage from '@/pages/DetalleProyectoPage'
import AvancePage from '@/pages/AvancePage'
import SeguimientoPage from '@/pages/SeguimientoPage'
import TribunalesPage from '@/pages/TribunalesPage'
import ActasPage from '@/pages/ActasPage'
import UsuariosPage from '@/pages/UsuariosPage'
import ConfiguracionPage from '@/pages/ConfiguracionPage'
import CalendarioPage from '@/pages/CalendarioPage'
import NotificacionesPage from '@/pages/NotificacionesPage'
import ReportesPage from '@/pages/ReportesPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<RoleBasedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/proyectos" element={<ProyectosPage />} />
            <Route path="/proyectos/:id" element={<DetalleProyectoPage />} />
            <Route path="/avances" element={<AvancePage />} />
            <Route path="/seguimiento" element={<SeguimientoPage />} />
            <Route
              path="/tribunales"
              element={
                <RoleBasedRoute requiredRoles={['director', 'secretaria', 'tribunal']}>
                  <TribunalesPage />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/actas"
              element={
                <RoleBasedRoute requiredRoles={['director', 'tribunal']}>
                  <ActasPage />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <RoleBasedRoute requiredRoles={['administrador']}>
                  <UsuariosPage />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/configuracion"
              element={
                <RoleBasedRoute requiredRoles={['administrador', 'director']}>
                  <ConfiguracionPage />
                </RoleBasedRoute>
              }
            />
            <Route path="/calendario" element={<CalendarioPage />} />
            <Route path="/notificaciones" element={<NotificacionesPage />} />
            <Route
              path="/reportes"
              element={
                <RoleBasedRoute requiredRoles={['director', 'secretaria']}>
                  <ReportesPage />
                </RoleBasedRoute>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  )
}
