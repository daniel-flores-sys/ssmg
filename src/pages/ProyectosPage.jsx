import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROLES, MODALIDADES } from '@/utils/constants'
import { getEstadoLabel, getBadgeVariant, formatFecha } from '@/utils/helpers'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FeedbackBanner } from '@/components/ui/feedback-banner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { Search, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

const ESTADOS_VALIDABLES = ['borrador', 'en-revision']

export default function ProyectosPage() {
  const { datos, rolActivo } = useAuth()
  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [filtroModalidad, setFiltroModalidad] = useState('todas')
  const [feedback, setFeedback] = useState(null)

  const esEstudiante = rolActivo === ROLES.ESTUDIANTE
  const esSecretaria = rolActivo === ROLES.SECRETARIA

  const [proyectos, setProyectos] = useState(datos?.proyectos ?? [])
  const [dialogAprobar, setDialogAprobar] = useState(null)
  const [dialogRechazar, setDialogRechazar] = useState(null)
  const [obsRechazo, setObsRechazo] = useState('')

  const mostrarFeedback = (mensaje, tipo = 'exito') => setFeedback({ mensaje, tipo })

  const handleAprobar = () => {
    if (!dialogAprobar) return
    const nuevoEstado = dialogAprobar.estado === 'borrador' ? 'en-revision' : 'perfil-aprobado'
    setProyectos(prev => prev.map(p =>
      p.id !== dialogAprobar.id ? p : { ...p, estado: nuevoEstado }
    ))
    setDialogAprobar(null)
    mostrarFeedback(`Propuesta aprobada. El proyecto avanzó al estado "${getEstadoLabel(nuevoEstado)}".`)
  }

  const handleRechazar = () => {
    if (!dialogRechazar || !obsRechazo.trim()) return
    setProyectos(prev => prev.map(p =>
      p.id !== dialogRechazar.id ? p : { ...p, estado: 'con-observaciones' }
    ))
    setObsRechazo('')
    setDialogRechazar(null)
    mostrarFeedback('Propuesta rechazada con observaciones. El estudiante y tutor han sido notificados.', 'error')
  }

  // Vista de estudiante
  if (esEstudiante) {
    const proyecto = datos?.proyecto
    if (!proyecto) return (
      <div className="space-y-4">
        <h2 className="text-base font-semibold">Mi Proyecto</h2>
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">No tienes proyectos registrados.</CardContent></Card>
      </div>
    )
    return (
      <div className="space-y-4">
        <h2 className="text-base font-semibold">Mi Proyecto</h2>
        <Card className="cursor-pointer" onClick={() => navigate(`/proyectos/${proyecto.id}`)}>
          <CardContent className="py-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{proyecto.titulo}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{MODALIDADES[proyecto.modalidad]}</p>
              </div>
              <Badge variant={getBadgeVariant(proyecto.estado)}>{getEstadoLabel(proyecto.estado)}</Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{proyecto.descripcion}</p>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Avance</span><span className="font-medium">{proyecto.porcentajeAvance}%</span></div>
              <Progress value={proyecto.porcentajeAvance} className="h-1.5" />
            </div>
            <p className="text-xs text-muted-foreground">Registrado: {formatFecha(proyecto.fechaRegistro)}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const proyectosFiltrados = proyectos.filter(p => {
    const matchBusqueda = busqueda === '' ||
      p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      `${p.estudiante?.nombre} ${p.estudiante?.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
    const matchEstado = filtroEstado === 'todos' || p.estado === filtroEstado
    const matchModalidad = filtroModalidad === 'todas' || p.modalidad === filtroModalidad
    return matchBusqueda && matchEstado && matchModalidad
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Proyectos</h2>
        <span className="text-sm text-muted-foreground">{proyectosFiltrados.length} resultado{proyectosFiltrados.length !== 1 ? 's' : ''}</span>
      </div>

      <FeedbackBanner feedback={feedback} onClear={() => setFeedback(null)} />

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o estudiante..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filtroModalidad} onValueChange={setFiltroModalidad}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Modalidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las modalidades</SelectItem>
            {Object.entries(MODALIDADES).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filtroEstado} onValueChange={setFiltroEstado}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            {[
              ['borrador', 'Borrador'],
              ['en-revision', 'En Revisión'],
              ['perfil-aprobado', 'Perfil Aprobado'],
              ['tribunal-asignado', 'Tribunal Asignado'],
              ['con-observaciones', 'Con Observaciones'],
              ['defensa-publica-programada', 'Defensa Pública Prog.'],
              ['aprobado', 'Aprobado'],
            ].map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {proyectosFiltrados.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">Sin proyectos que coincidan con los filtros.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {proyectosFiltrados.map(p => {
            const puedeValidar = esSecretaria && ESTADOS_VALIDABLES.includes(p.estado)
            return (
              <Card key={p.id}
                className={puedeValidar ? undefined : 'cursor-pointer hover:shadow-md transition-shadow'}
                onClick={puedeValidar ? undefined : () => navigate(`/proyectos/${p.id}`)}>
                <CardContent className="py-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{p.titulo}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {p.estudiante?.nombre} {p.estudiante?.apellido} · {MODALIDADES[p.modalidad]}
                      </p>
                    </div>
                    <Badge variant={getBadgeVariant(p.estado)} className="text-xs shrink-0">
                      {getEstadoLabel(p.estado)}
                    </Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Avance</span>
                      <span>{p.porcentajeAvance}%</span>
                    </div>
                    <Progress value={p.porcentajeAvance} className="h-1" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Tutor: {p.tutorInterno ? `${p.tutorInterno.nombre} ${p.tutorInterno.apellido}` : 'Sin asignar'}</span>
                    <span>{formatFecha(p.fechaUltimaActualizacion)}</span>
                  </div>
                  {puedeValidar && (
                    <div className="flex gap-2 pt-1" onClick={e => e.stopPropagation()}>
                      <Button size="sm" className="bg-success text-success-foreground hover:bg-success/80"
                        onClick={() => setDialogAprobar(p)}>
                        <CheckCircle2 className="w-3 h-3 mr-1" />Aprobar propuesta
                      </Button>
                      <Button size="sm" variant="destructive"
                        onClick={() => { setObsRechazo(''); setDialogRechazar(p) }}>
                        <XCircle className="w-3 h-3 mr-1" />Rechazar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Dialog: Aprobar propuesta */}
      <Dialog open={!!dialogAprobar} onOpenChange={open => !open && setDialogAprobar(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Aprobar propuesta
            </DialogTitle>
            <DialogDescription>{dialogAprobar?.titulo}</DialogDescription>
          </DialogHeader>
          <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estudiante</span>
              <span className="font-medium">{dialogAprobar?.estudiante?.nombre} {dialogAprobar?.estudiante?.apellido}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estado actual</span>
              <span className="font-medium">{dialogAprobar && getEstadoLabel(dialogAprobar.estado)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nuevo estado</span>
              <span className="font-medium text-success">
                {dialogAprobar && getEstadoLabel(dialogAprobar.estado === 'borrador' ? 'en-revision' : 'perfil-aprobado')}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAprobar(null)}>Cancelar</Button>
            <Button className="bg-success text-success-foreground hover:bg-success/80" onClick={handleAprobar}>
              <CheckCircle2 className="w-3 h-3 mr-1" />Confirmar aprobación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Rechazar propuesta */}
      <Dialog open={!!dialogRechazar} onOpenChange={open => !open && setDialogRechazar(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              Rechazar propuesta
            </DialogTitle>
            <DialogDescription>{dialogRechazar?.titulo}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Observaciones *</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
                placeholder="Indica los motivos del rechazo y qué debe corregirse…"
                value={obsRechazo}
                onChange={e => setObsRechazo(e.target.value)}
              />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                El proyecto pasará a estado "Con observaciones" y el estudiante y tutor serán notificados.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogRechazar(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleRechazar} disabled={!obsRechazo.trim()}>
              <XCircle className="w-3 h-3 mr-1" />Confirmar rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
