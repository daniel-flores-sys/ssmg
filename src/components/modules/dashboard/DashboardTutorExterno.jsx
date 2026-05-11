import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { MODALIDADES } from '@/utils/constants'
import { formatFecha, getEstadoLabel, getBadgeVariant } from '@/utils/helpers'
import { Building2, CheckCircle2 } from 'lucide-react'

export default function DashboardTutorExterno({ usuario }) {
  const { datos } = useAuth()
  const navigate = useNavigate()
  const { proyecto, informes = [], notificaciones = [] } = datos
  const noLeidas = notificaciones.filter(n => !n.leida)
  const informesAprobados = informes.filter(i => i.estado === 'aprobado').length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Bienvenido, {usuario?.nombre}</h2>
        <p className="text-sm text-muted-foreground">Tutor Externo — {datos.usuarioActivo?.institucion}</p>
      </div>

      {proyecto && (
        <>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold">{proyecto.titulo}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{MODALIDADES[proyecto.modalidad]} · {proyecto.estudiante?.nombre} {proyecto.estudiante?.apellido}</p>
                </div>
                <Badge variant={getBadgeVariant(proyecto.estado)}>{getEstadoLabel(proyecto.estado)}</Badge>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Avance general</span>
                  <span className="font-medium">{proyecto.porcentajeAvance}%</span>
                </div>
                <Progress value={proyecto.porcentajeAvance} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Inicio internado</p>
                  <p className="font-medium">{formatFecha(proyecto.fechaInicioInternado)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fin internado</p>
                  <p className="font-medium">{formatFecha(proyecto.fechaFinInternado)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Informes emitidos ({informesAprobados}/{informes.length})</h3>
            </div>
            {informes.map(inf => (
              <Card key={inf.id}>
                <CardContent className="py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{inf.mes}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{inf.descripcion}</p>
                      {inf.notaEvaluacion !== null && (
                        <p className="text-xs mt-1">Nota: <span className="font-medium">{inf.notaEvaluacion}/15</span></p>
                      )}
                    </div>
                    <Badge variant="default" className="text-xs flex-shrink-0"><CheckCircle2 className="w-3 h-3 mr-1" />Aprobado</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
