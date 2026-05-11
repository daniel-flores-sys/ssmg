import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ROLES_LABELS } from '@/utils/constants'
import { formatFecha } from '@/utils/helpers'
import { UserCog, Users, ShieldAlert } from 'lucide-react'

export default function DashboardAdministrador({ usuario }) {
  const { datos } = useAuth()
  const navigate = useNavigate()
  const { usuarios = [], estadisticasSistema = {}, notificaciones = [] } = datos
  const noLeidas = notificaciones.filter(n => !n.leida)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Bienvenido, {usuario?.nombre}</h2>
        <p className="text-sm text-muted-foreground">Panel de Administración del Sistema</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold">{estadisticasSistema.totalUsuarios ?? 0}</p><p className="text-xs text-muted-foreground mt-1">Usuarios totales</p></CardContent></Card>
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold text-success">{estadisticasSistema.usuariosActivos ?? 0}</p><p className="text-xs text-muted-foreground mt-1">Activos</p></CardContent></Card>
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold text-muted-foreground">{estadisticasSistema.usuariosInactivos ?? 0}</p><p className="text-xs text-muted-foreground mt-1">Inactivos</p></CardContent></Card>
      </div>

      {/* Distribución por rol */}
      <Card>
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-sm">Distribución por rol</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(estadisticasSistema.porRol ?? {}).map(([rol, cantidad]) => (
              <div key={rol} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <span className="text-xs text-muted-foreground">{ROLES_LABELS[rol]}</span>
                <span className="text-sm font-bold">{cantidad}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usuarios recientes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Usuarios del sistema</h3>
          <Button variant="outline" size="sm" onClick={() => navigate('/usuarios')}>Gestionar</Button>
        </div>
        {usuarios.slice(0, 6).map(u => (
          <Card key={u.id}>
            <CardContent className="py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{u.nombre} {u.apellido}</p>
                  <p className="text-xs text-muted-foreground">{u.email} · {ROLES_LABELS[u.rol]}</p>
                </div>
                <Badge variant={u.activo ? 'default' : 'secondary'} className="text-xs">
                  {u.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
