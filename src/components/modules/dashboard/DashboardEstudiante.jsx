import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { MODALIDADES } from '@/utils/constants'
import { formatFechaHora, getEstadoLabel, getBadgeVariant } from '@/utils/helpers'
import { ClipboardList, Activity, Bell, BookOpen } from 'lucide-react'

export default function DashboardEstudiante({ usuario }) {
  const { datos } = useAuth()
  const navigate = useNavigate()
  const { proyecto, avances = [], seguimiento = [], notificaciones = [] } = datos
  const noLeidas = notificaciones.filter(n => !n.leida)

  if (!proyecto) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Bienvenido, {usuario?.nombre}</h2>
          <p className="text-sm text-muted-foreground">No tienes proyectos registrados.</p>
        </div>
        <Card>
          <CardContent className="py-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 mx-auto text-muted-foreground" />
            <p className="text-sm font-medium">Sin proyecto registrado</p>
            <p className="text-sm text-muted-foreground">Contacta con la secretaría para registrar tu propuesta.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const avancesAprobados = avances.filter(a => a.estado === 'aprobado').length
  const avancesPendientes = avances.filter(a => a.estado === 'pendiente').length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Bienvenido, {usuario?.nombre}</h2>
        <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('es-BO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Mi proyecto */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base">{proyecto.titulo}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{MODALIDADES[proyecto.modalidad]}</p>
            </div>
            <Badge variant={getBadgeVariant(proyecto.estado)}>
              {getEstadoLabel(proyecto.estado)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Porcentaje de avance</span>
              <span className="font-medium">{proyecto.porcentajeAvance}%</span>
            </div>
            <Progress value={proyecto.porcentajeAvance} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-success">{avancesAprobados}</p>
              <p className="text-xs text-muted-foreground">Aprobados</p>
            </div>
            <div>
              <p className="text-lg font-bold text-warning">{avancesPendientes}</p>
              <p className="text-xs text-muted-foreground">Pendientes</p>
            </div>
            <div>
              <p className="text-lg font-bold">{avances.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>

          <Separator />

          <div className="text-sm space-y-1">
            <p><span className="text-muted-foreground">Tutor Interno:</span> {proyecto.tutorInterno ? `${proyecto.tutorInterno.nombre} ${proyecto.tutorInterno.apellido}` : '—'}</p>
            {proyecto.tribunal && (
              <p><span className="text-muted-foreground">Presidente:</span> {proyecto.tribunal.presidente.nombre} {proyecto.tribunal.presidente.apellido}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={() => navigate('/proyectos')}>Ver proyecto</Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/avances')}>Ver avances</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Seguimiento reciente */}
        <Card>
          <CardHeader className="border-b pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Seguimiento reciente</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/seguimiento')}>Ver más</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-3 space-y-3">
            {seguimiento.slice(0, 3).map((ev) => (
              <div key={ev.id} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs">{ev.descripcion}</p>
                  <p className="text-xs text-muted-foreground">{formatFechaHora(ev.fecha)} · {ev.autor}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card>
          <CardHeader className="border-b pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Notificaciones</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/notificaciones')}>Ver más</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-3 space-y-3">
            {noLeidas.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">Sin nuevas notificaciones</p>
            ) : noLeidas.slice(0, 3).map((n) => (
              <div key={n.id} className="flex gap-2">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.tipo === 'urgente' ? 'bg-destructive' : n.tipo === 'alerta' ? 'bg-warning' : 'bg-primary'}`} />
                <div>
                  <p className="text-xs font-medium">{n.titulo}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{n.mensaje}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
