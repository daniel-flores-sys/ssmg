import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MODALIDADES } from '@/utils/constants'
import { formatFecha, getEstadoLabel, getBadgeVariant } from '@/utils/helpers'
import { FolderOpen, Calendar, Bell } from 'lucide-react'

export default function DashboardSecretaria({ usuario }) {
  const { datos } = useAuth()
  const navigate = useNavigate()
  const { proyectos = [], eventosCalendario = [], notificaciones = [] } = datos
  const noLeidas = notificaciones.filter(n => !n.leida)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Bienvenido, {usuario?.nombre}</h2>
        <p className="text-sm text-muted-foreground">Panel de secretaría</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold">{proyectos.length}</p><p className="text-xs text-muted-foreground mt-1">Total proyectos</p></CardContent></Card>
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold text-warning">{proyectos.filter(p => p.estado === 'en-revision').length}</p><p className="text-xs text-muted-foreground mt-1">En revisión</p></CardContent></Card>
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold text-destructive">{noLeidas.length}</p><p className="text-xs text-muted-foreground mt-1">Notificaciones</p></CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Proyectos</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/proyectos')}>Ver todos</Button>
          </div>
          {proyectos.slice(0, 5).map(p => (
            <Card key={p.id} className="cursor-pointer" onClick={() => navigate(`/proyectos/${p.id}`)}>
              <CardContent className="py-3 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.titulo}</p>
                  <p className="text-xs text-muted-foreground">{p.estudiante?.nombre} {p.estudiante?.apellido} · {MODALIDADES[p.modalidad]}</p>
                </div>
                <Badge variant={getBadgeVariant(p.estado)} className="text-xs flex-shrink-0">{getEstadoLabel(p.estado)}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Próximas defensas</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/calendario')}>Calendario</Button>
          </div>
          {eventosCalendario.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Sin defensas programadas</CardContent></Card>
          ) : eventosCalendario.map(ev => (
            <Card key={ev.id}>
              <CardContent className="py-3">
                <p className="text-sm font-medium">{ev.titulo}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatFecha(ev.fecha, "dd/MM/yyyy HH:mm")} · {ev.sala}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
