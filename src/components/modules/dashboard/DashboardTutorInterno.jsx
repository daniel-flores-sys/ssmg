import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { MODALIDADES } from '@/utils/constants'
import { formatFecha, getEstadoLabel, getBadgeVariant } from '@/utils/helpers'
import { AlertCircle } from 'lucide-react'

export default function DashboardTutorInterno({ usuario }) {
  const { datos } = useAuth()
  const navigate = useNavigate()
  const { proyectos = [], avancesPendientes = [], notificaciones = [] } = datos
  const noLeidas = notificaciones.filter(n => !n.leida)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Bienvenido, {usuario?.nombre}</h2>
        <p className="text-sm text-muted-foreground">Panel de Tutor Interno</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold">{proyectos.length}</p><p className="text-xs text-muted-foreground mt-1">Proyectos activos</p></CardContent></Card>
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold text-warning">{avancesPendientes.length}</p><p className="text-xs text-muted-foreground mt-1">Avances por revisar</p></CardContent></Card>
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold text-destructive">{noLeidas.length}</p><p className="text-xs text-muted-foreground mt-1">Notificaciones</p></CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Mis proyectos</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/proyectos')}>Ver todos</Button>
          </div>
          {proyectos.map(p => (
            <Card key={p.id} className="cursor-pointer" onClick={() => navigate(`/proyectos/${p.id}`)}>
              <CardContent className="py-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.titulo}</p>
                    <p className="text-xs text-muted-foreground">{p.estudiante?.nombre} {p.estudiante?.apellido}</p>
                  </div>
                  <Badge variant={getBadgeVariant(p.estado)} className="text-xs flex-shrink-0">{getEstadoLabel(p.estado)}</Badge>
                </div>
                <Progress value={p.porcentajeAvance} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{p.porcentajeAvance}% completado · {p.avancesPendientes ?? 0} avances pendientes</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Avances por revisar</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/avances')}>Ver avances</Button>
          </div>
          {avancesPendientes.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Sin avances pendientes</CardContent></Card>
          ) : avancesPendientes.map(av => (
            <Card key={av.id}>
              <CardContent className="py-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{av.titulo}</p>
                    <p className="text-xs text-muted-foreground">{av.estudiante} · {formatFecha(av.fechaCreacion)}</p>
                    <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate('/avances')}>Revisar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
