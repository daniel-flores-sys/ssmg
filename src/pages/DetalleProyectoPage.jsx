import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROLES, MODALIDADES } from '@/utils/constants'
import { getEstadoLabel, getBadgeVariant, formatFecha } from '@/utils/helpers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, User, Users, FileText, Activity, CheckCircle2, Clock } from 'lucide-react'

export default function DetalleProyectoPage() {
  const { id } = useParams()
  const { datos, rolActivo } = useAuth()
  const navigate = useNavigate()

  const esEstudiante = rolActivo === ROLES.ESTUDIANTE
  const proyecto = esEstudiante
    ? datos?.proyecto
    : datos?.proyectos?.find(p => p.id === id)

  if (!proyecto) return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" />Volver
      </Button>
      <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">Proyecto no encontrado.</CardContent></Card>
    </div>
  )

  const avances = esEstudiante ? (datos?.avances ?? []) : []
  const seguimiento = esEstudiante ? (datos?.seguimiento ?? []) : []

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" />Volver a proyectos
      </Button>

      {/* Cabecera */}
      <Card>
        <CardContent className="py-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h2 className="text-base font-semibold">{proyecto.titulo}</h2>
              <p className="text-sm text-muted-foreground mt-1">{MODALIDADES[proyecto.modalidad]}</p>
            </div>
            <Badge variant={getBadgeVariant(proyecto.estado)}>{getEstadoLabel(proyecto.estado)}</Badge>
          </div>
          {proyecto.descripcion && (
            <p className="text-sm text-muted-foreground">{proyecto.descripcion}</p>
          )}
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Porcentaje de avance</span>
              <span className="font-medium">{proyecto.porcentajeAvance}%</span>
            </div>
            <Progress value={proyecto.porcentajeAvance} className="h-2" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Fecha de registro:</span> <span>{formatFecha(proyecto.fechaRegistro)}</span></div>
            <div><span className="text-muted-foreground">Última actualización:</span> <span>{formatFecha(proyecto.fechaUltimaActualizacion)}</span></div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="avances">Avances</TabsTrigger>
          <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
          {proyecto.defensas?.length > 0 && <TabsTrigger value="defensas">Defensas</TabsTrigger>}
        </TabsList>

        {/* Tab: Información */}
        <TabsContent value="info" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="border-b pb-3"><CardTitle className="text-sm flex items-center gap-2"><User className="w-4 h-4" />Participantes</CardTitle></CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estudiante</span>
                <span className="font-medium">{proyecto.estudiante?.nombre} {proyecto.estudiante?.apellido}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tutor Interno</span>
                <span>{proyecto.tutorInterno ? `${proyecto.tutorInterno.nombre} ${proyecto.tutorInterno.apellido}` : <span className="text-muted-foreground italic">Sin asignar</span>}</span>
              </div>
              {proyecto.tutorExterno && (
                <>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tutor Externo</span>
                    <span>{proyecto.tutorExterno.nombre} {proyecto.tutorExterno.apellido} ({proyecto.tutorExterno.institucion})</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {proyecto.tribunal && (
            <Card>
              <CardHeader className="border-b pb-3"><CardTitle className="text-sm flex items-center gap-2"><Users className="w-4 h-4" />Tribunal</CardTitle></CardHeader>
              <CardContent className="pt-4 space-y-3 text-sm">
                {[
                  { label: 'Presidente', data: proyecto.tribunal.presidente },
                  { label: 'Vocal 1', data: proyecto.tribunal.vocal1 },
                  { label: 'Vocal 2', data: proyecto.tribunal.vocal2 },
                ].map(({ label, data }) => data && (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span>{data.nombre} {data.apellido}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab: Avances */}
        <TabsContent value="avances" className="space-y-3 mt-4">
          {avances.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Sin avances registrados.</CardContent></Card>
          ) : avances.map(av => (
            <Card key={av.id}>
              <CardContent className="py-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{av.titulo}</p>
                    <p className="text-xs text-muted-foreground">{formatFecha(av.fechaCreacion)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{av.porcentaje}%</span>
                    <Badge variant={getBadgeVariant(av.estado === 'aprobado' ? 'aprobado' : av.estado === 'pendiente' ? 'pendiente' : 'rechazado')} className="text-xs">
                      {av.estado === 'aprobado' ? 'Aprobado' : av.estado === 'pendiente' ? 'Pendiente' : 'Rechazado'}
                    </Badge>
                  </div>
                </div>
                {av.observaciones && (
                  <p className="text-xs text-muted-foreground bg-muted rounded p-2">{av.observaciones}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Tab: Seguimiento */}
        <TabsContent value="seguimiento" className="mt-4">
          {seguimiento.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Sin eventos de seguimiento.</CardContent></Card>
          ) : (
            <div className="relative pl-4 border-l border-border space-y-4">
              {seguimiento.map(ev => (
                <div key={ev.id} className="relative">
                  <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  <div className="pl-2">
                    <p className="text-sm">{ev.descripcion}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatFecha(ev.fecha, 'dd/MM/yyyy HH:mm')} · {ev.autor}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Tab: Defensas */}
        {proyecto.defensas?.length > 0 && (
          <TabsContent value="defensas" className="space-y-3 mt-4">
            {proyecto.defensas.map(d => (
              <Card key={d.id}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium capitalize">Defensa {d.tipo}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatFecha(d.fecha, 'dd/MM/yyyy HH:mm')} · {d.sala}</p>
                    </div>
                    <Badge variant={d.estado === 'programada' ? 'outline' : 'default'} className="text-xs capitalize">{d.estado}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
