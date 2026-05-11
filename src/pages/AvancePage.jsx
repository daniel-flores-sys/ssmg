import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ROLES } from '@/utils/constants'
import { formatFecha, getBadgeVariant, puedeEditarAvance } from '@/utils/helpers'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FeedbackBanner } from '@/components/ui/feedback-banner'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { CheckCircle2, XCircle, Clock, Edit2, AlertCircle, Plus } from 'lucide-react'

const ESTADO_ICONS = {
  aprobado: <CheckCircle2 className="w-4 h-4 text-success" />,
  pendiente: <Clock className="w-4 h-4 text-warning" />,
  rechazado: <XCircle className="w-4 h-4 text-destructive" />,
}

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  )
}

export default function AvancePage() {
  const { datos, rolActivo } = useAuth()

  const esTutorInterno = rolActivo === ROLES.TUTOR_INTERNO
  const esEstudiante = rolActivo === ROLES.ESTUDIANTE

  const [avances, setAvances] = useState(datos?.avances ?? [])
  const [pendientes, setPendientes] = useState(datos?.avancesPendientes ?? [])
  const [feedback, setFeedback] = useState(null)

  // Dialogs state
  const [dialogRegistrar, setDialogRegistrar] = useState(false)
  const [dialogAprobar, setDialogAprobar] = useState(null)
  const [dialogRechazar, setDialogRechazar] = useState(null)
  const [dialogEditar, setDialogEditar] = useState(null)

  // Form state
  const [formNuevo, setFormNuevo] = useState({ titulo: '', descripcion: '', porcentaje: '' })
  const [formEdit, setFormEdit] = useState({ titulo: '', descripcion: '', porcentaje: '' })
  const [obsAprobar, setObsAprobar] = useState('')
  const [obsRechazar, setObsRechazar] = useState('')

  const mostrarFeedback = (mensaje, tipo = 'exito') => setFeedback({ mensaje, tipo })

  const handleRegistrar = () => {
    if (!formNuevo.titulo.trim() || !formNuevo.porcentaje) return
    const ahora = new Date().toISOString()
    const limiteEdicion = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    const nuevoAvance = {
      id: `av_${Date.now()}`,
      proyectoId: datos?.proyecto?.id ?? '',
      titulo: formNuevo.titulo.trim(),
      descripcion: formNuevo.descripcion.trim(),
      porcentaje: Number(formNuevo.porcentaje),
      estado: 'pendiente',
      fechaCreacion: ahora,
      fechaLimiteEdicion: limiteEdicion,
      observaciones: null,
    }
    setAvances(prev => [nuevoAvance, ...prev])
    setFormNuevo({ titulo: '', descripcion: '', porcentaje: '' })
    setDialogRegistrar(false)
    mostrarFeedback('Avance registrado exitosamente. Tu tutor recibirá una notificación.')
  }

  const handleEditar = () => {
    if (!dialogEditar || !formEdit.titulo.trim() || !formEdit.porcentaje) return
    setAvances(prev => prev.map(a =>
      a.id !== dialogEditar.id ? a : {
        ...a,
        titulo: formEdit.titulo.trim(),
        descripcion: formEdit.descripcion.trim(),
        porcentaje: Number(formEdit.porcentaje),
      }
    ))
    setDialogEditar(null)
    mostrarFeedback('Avance actualizado correctamente.')
  }

  const handleAprobar = () => {
    if (!dialogAprobar) return
    setPendientes(prev => prev.filter(a => a.id !== dialogAprobar.id))
    setObsAprobar('')
    setDialogAprobar(null)
    mostrarFeedback(`Avance "${dialogAprobar.titulo}" aprobado. El estudiante ha sido notificado.`)
  }

  const handleRechazar = () => {
    if (!dialogRechazar || !obsRechazar.trim()) return
    setPendientes(prev => prev.filter(a => a.id !== dialogRechazar.id))
    setObsRechazar('')
    setDialogRechazar(null)
    mostrarFeedback(`Avance rechazado. Se enviaron las observaciones al estudiante.`, 'error')
  }

  const abrirEditar = (av) => {
    setFormEdit({ titulo: av.titulo, descripcion: av.descripcion ?? '', porcentaje: String(av.porcentaje) })
    setDialogEditar(av)
  }

  const lista = esEstudiante ? avances : esTutorInterno ? pendientes : []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">
          {esEstudiante ? 'Mis Avances' : esTutorInterno ? 'Avances por Revisar' : 'Avances'}
        </h2>
        {esEstudiante && (
          <Button size="sm" onClick={() => setDialogRegistrar(true)}>
            <Plus className="w-3 h-3 mr-1" />Registrar avance
          </Button>
        )}
      </div>

      <FeedbackBanner feedback={feedback} onClear={() => setFeedback(null)} />

      {lista.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            {esTutorInterno ? 'No hay avances pendientes de revisión.' : 'Sin avances registrados.'}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {lista.map(av => {
            const editable = esEstudiante && puedeEditarAvance(av.fechaCreacion)
            return (
              <Card key={av.id}>
                <CardContent className="py-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {ESTADO_ICONS[av.estado] ?? ESTADO_ICONS.pendiente}
                      <div>
                        <p className="text-sm font-medium">{av.titulo}</p>
                        {esTutorInterno && (
                          <p className="text-xs text-muted-foreground">{av.estudiante} · {av.proyectoTitulo}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{formatFecha(av.fechaCreacion)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{av.porcentaje}%</span>
                      <Badge variant={getBadgeVariant(av.estado === 'aprobado' ? 'aprobado_avance' : av.estado)} className="text-xs capitalize">
                        {av.estado === 'aprobado' ? 'Aprobado' : av.estado === 'pendiente' ? 'Pendiente' : 'Rechazado'}
                      </Badge>
                    </div>
                  </div>

                  {av.descripcion && (
                    <p className="text-sm text-muted-foreground">{av.descripcion}</p>
                  )}

                  {av.observaciones && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">{av.observaciones}</AlertDescription>
                    </Alert>
                  )}

                  {esEstudiante && editable && (
                    <div className="flex gap-2 items-center">
                      <Button size="sm" variant="outline" onClick={() => abrirEditar(av)}>
                        <Edit2 className="w-3 h-3 mr-1" />Editar
                      </Button>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />Editable hasta {formatFecha(av.fechaLimiteEdicion, 'HH:mm')}
                      </span>
                    </div>
                  )}

                  {esTutorInterno && av.estado === 'pendiente' && (
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" className="bg-success text-success-foreground hover:bg-success/80"
                        onClick={() => { setObsAprobar(''); setDialogAprobar(av) }}>
                        <CheckCircle2 className="w-3 h-3 mr-1" />Aprobar
                      </Button>
                      <Button size="sm" variant="destructive"
                        onClick={() => { setObsRechazar(''); setDialogRechazar(av) }}>
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

      {/* Dialog: Registrar avance */}
      <Dialog open={dialogRegistrar} onOpenChange={setDialogRegistrar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar avance</DialogTitle>
            <DialogDescription>El avance podrá editarse durante las primeras 24 horas.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="Título *">
              <input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Ej. Capítulo 3 — Implementación"
                value={formNuevo.titulo}
                onChange={e => setFormNuevo(p => ({ ...p, titulo: e.target.value }))}
              />
            </Field>
            <Field label="Descripción">
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
                placeholder="Describe brevemente lo que incluye este avance…"
                value={formNuevo.descripcion}
                onChange={e => setFormNuevo(p => ({ ...p, descripcion: e.target.value }))}
              />
            </Field>
            <Field label="Porcentaje completado *">
              <input
                type="number" min="1" max="100"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0 – 100"
                value={formNuevo.porcentaje}
                onChange={e => setFormNuevo(p => ({ ...p, porcentaje: e.target.value }))}
              />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogRegistrar(false)}>Cancelar</Button>
            <Button onClick={handleRegistrar} disabled={!formNuevo.titulo.trim() || !formNuevo.porcentaje}>
              <Plus className="w-3 h-3 mr-1" />Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Editar avance */}
      <Dialog open={!!dialogEditar} onOpenChange={open => !open && setDialogEditar(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar avance</DialogTitle>
            <DialogDescription>Puedes modificar este avance mientras esté dentro de la ventana de 24 horas.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="Título *">
              <input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={formEdit.titulo}
                onChange={e => setFormEdit(p => ({ ...p, titulo: e.target.value }))}
              />
            </Field>
            <Field label="Descripción">
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
                value={formEdit.descripcion}
                onChange={e => setFormEdit(p => ({ ...p, descripcion: e.target.value }))}
              />
            </Field>
            <Field label="Porcentaje completado *">
              <input
                type="number" min="1" max="100"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={formEdit.porcentaje}
                onChange={e => setFormEdit(p => ({ ...p, porcentaje: e.target.value }))}
              />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogEditar(null)}>Cancelar</Button>
            <Button onClick={handleEditar} disabled={!formEdit.titulo.trim() || !formEdit.porcentaje}>
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Aprobar avance */}
      <Dialog open={!!dialogAprobar} onOpenChange={open => !open && setDialogAprobar(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Aprobar avance
            </DialogTitle>
            <DialogDescription>{dialogAprobar?.titulo}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estudiante</span>
                <span className="font-medium">{dialogAprobar?.estudiante}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avance declarado</span>
                <span className="font-medium">{dialogAprobar?.porcentaje}%</span>
              </div>
            </div>
            <Field label="Observaciones (opcional)">
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
                placeholder="Comentarios o sugerencias para el estudiante…"
                value={obsAprobar}
                onChange={e => setObsAprobar(e.target.value)}
              />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAprobar(null)}>Cancelar</Button>
            <Button className="bg-success text-success-foreground hover:bg-success/80" onClick={handleAprobar}>
              <CheckCircle2 className="w-3 h-3 mr-1" />Confirmar aprobación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Rechazar avance */}
      <Dialog open={!!dialogRechazar} onOpenChange={open => !open && setDialogRechazar(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              Rechazar avance
            </DialogTitle>
            <DialogDescription>{dialogRechazar?.titulo}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estudiante</span>
                <span className="font-medium">{dialogRechazar?.estudiante}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avance declarado</span>
                <span className="font-medium">{dialogRechazar?.porcentaje}%</span>
              </div>
            </div>
            <Field label="Observaciones *">
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
                placeholder="Indica qué debe corregir o mejorar el estudiante…"
                value={obsRechazar}
                onChange={e => setObsRechazar(e.target.value)}
              />
            </Field>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Las observaciones serán enviadas al estudiante con el estado de rechazo.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogRechazar(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleRechazar} disabled={!obsRechazar.trim()}>
              <XCircle className="w-3 h-3 mr-1" />Confirmar rechazo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
