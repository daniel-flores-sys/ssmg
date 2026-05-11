import { useNavigate } from 'react-router-dom'
import { FolderOpen, Users, Award, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ESTADOS_PROYECTO, MODALIDADES } from '@/utils/constants'
import { formatFecha, getEstadoLabel, getBadgeVariant } from '@/utils/helpers'

export default function DashboardDirector({ usuario }) {
  const { datos } = useAuth()
  const navigate = useNavigate()
  const { proyectos = [], estadisticas = {}, notificaciones = [] } = datos

  const noLeidas = notificaciones.filter(n => !n.leida)

  const statCards = [
    { label: 'Proyectos activos', value: estadisticas.totalProyectos ?? 0, icon: FolderOpen, color: 'text-primary' },
    { label: 'Defensas programadas', value: estadisticas.defensasProgramadas ?? 0, icon: Calendar, color: 'text-warning' },
    { label: 'Con observaciones', value: estadisticas.porEstado?.['con-observaciones'] ?? 0, icon: AlertTriangle, color: 'text-destructive' },
    { label: 'En revisión', value: estadisticas.porEstado?.['en-revision'] ?? 0, icon: CheckCircle2, color: 'text-success' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Bienvenido, {usuario?.nombre}</h2>
        <p className="text-sm text-muted-foreground">Panel de dirección — {new Date().toLocaleDateString('es-BO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Proyectos recientes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Proyectos activos</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/proyectos')}>Ver todos</Button>
          </div>
          <div className="space-y-3">
            {proyectos.slice(0, 4).map((p) => (
              <Card key={p.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/proyectos/${p.id}`)}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.titulo}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {p.estudiante?.nombre} {p.estudiante?.apellido} · {MODALIDADES[p.modalidad]}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Avance</span>
                          <span className="text-xs font-medium">{p.porcentajeAvance}%</span>
                        </div>
                        <Progress value={p.porcentajeAvance} className="h-1.5" />
                      </div>
                    </div>
                    <Badge variant={getBadgeVariant(p.estado)} className="text-xs flex-shrink-0">
                      {getEstadoLabel(p.estado)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notificaciones */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Notificaciones</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/notificaciones')}>Ver todas</Button>
          </div>
          <div className="space-y-2">
            {noLeidas.length === 0 ? (
              <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Sin notificaciones pendientes</CardContent></Card>
            ) : noLeidas.map((n) => (
              <Card key={n.id}>
                <CardContent className="py-3">
                  <div className="flex items-start gap-2">
                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.tipo === 'urgente' ? 'bg-destructive' : n.tipo === 'alerta' ? 'bg-warning' : 'bg-primary'}`} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium">{n.titulo}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.mensaje}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
