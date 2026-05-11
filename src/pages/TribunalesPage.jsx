import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ROLES, MODALIDADES } from '@/utils/constants'
import { formatFecha, getBadgeVariant, getEstadoLabel } from '@/utils/helpers'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FeedbackBanner } from '@/components/ui/feedback-banner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { Users, Calendar, AlertCircle } from 'lucide-react'

const DOCENTES_DISPONIBLES = [
  { id: 'u001', nombre: 'Roberto', apellido: 'Méndez Villca' },
  { id: 'u003', nombre: 'Pedro', apellido: 'Vargas Ríos' },
  { id: 'u004', nombre: 'Sofía', apellido: 'Castro Medina' },
  { id: 'u006', nombre: 'Diego', apellido: 'Morales Choque' },
  { id: 'u007', nombre: 'Valeria', apellido: 'Quispe Mamani' },
  { id: 'u013', nombre: 'Hugo', apellido: 'Mamani Ticona' },
  { id: 'u017', nombre: 'Elena', apellido: 'Soria Gutierrez' },
]

const SALAS = ['Sala de Defensa 1', 'Sala de Defensa 2', 'Aula Magna', 'Sala de Reuniones']

function SelectField({ label, value, onChange, children, required }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}{required && ' *'}</label>
      <select
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">— Seleccionar —</option>
        {children}
      </select>
    </div>
  )
}

export default function TribunalesPage() {
  const { datos, rolActivo } = useAuth()
  const esDirector = rolActivo === ROLES.DIRECTOR
  const esTribunal = rolActivo === ROLES.TRIBUNAL

  const [proyectos, setProyectos] = useState(datos?.proyectos ?? [])
  const [feedback, setFeedback] = useState(null)

  // Dialogs
  const [dialogTribunal, setDialogTribunal] = useState(null)
  const [dialogDefensa, setDialogDefensa] = useState(null)

  // Form: asignar tribunal
  const [formTribunal, setFormTribunal] = useState({ presidente: '', vocal1: '', vocal2: '' })

  // Form: programar defensa
  const [formDefensa, setFormDefensa] = useState({ tipo: 'privada', fecha: '', hora: '', sala: '' })

  const mostrarFeedback = (mensaje, tipo = 'exito') => setFeedback({ mensaje, tipo })

  const handleAsignarTribunal = () => {
    const { presidente, vocal1, vocal2 } = formTribunal
    if (!presidente || !vocal1 || !vocal2) return
    const find = id => DOCENTES_DISPONIBLES.find(d => d.id === id)
    setProyectos(prev => prev.map(p => {
      if (p.id !== dialogTribunal.id) return p
      return { ...p, tribunal: { presidente: find(presidente), vocal1: find(vocal1), vocal2: find(vocal2) } }
    }))
    setFormTribunal({ presidente: '', vocal1: '', vocal2: '' })
    setDialogTribunal(null)
    mostrarFeedback(`Tribunal asignado al proyecto "${dialogTribunal.titulo}". Los miembros serán notificados.`)
  }

  const handleProgramarDefensa = () => {
    const { tipo, fecha, hora, sala } = formDefensa
    if (!fecha || !hora || !sala) return
    const fechaISO = new Date(`${fecha}T${hora}:00`).toISOString()
    const nuevaDefensa = {
      id: `d_${Date.now()}`,
      tipo,
      fecha: fechaISO,
      sala,
      estado: 'programada',
    }
    setProyectos(prev => prev.map(p => {
      if (p.id !== dialogDefensa.id) return p
      return { ...p, defensas: [...(p.defensas ?? []), nuevaDefensa] }
    }))
    setFormDefensa({ tipo: 'privada', fecha: '', hora: '', sala: '' })
    setDialogDefensa(null)
    mostrarFeedback(`Defensa ${tipo} programada para el ${fecha} a las ${hora}. El tribunal y el estudiante serán notificados.`)
  }

  const rolesUsados = (form, excluding) =>
    Object.entries(form)
      .filter(([k, v]) => k !== excluding && v)
      .map(([, v]) => v)

  // Derived lists
  const conTribunal = proyectos.filter(p => p.tribunal)
  const sinTribunal = proyectos.filter(p =>
    !p.tribunal && ['perfil-aprobado', 'con-observaciones', 'en-revision'].includes(p.estado)
  )
  const conDefensa = proyectos.filter(p => p.defensas?.some(d => d.estado === 'programada'))

  const tieneDefensaProgramada = p =>
    p.defensas?.some(d => d.estado === 'programada')

  if (esTribunal) {
    const { defensasAsignadas = [], historialDefensas = [] } = datos
    return (
      <div className="space-y-4">
        <h2 className="text-base font-semibold">Mis Defensas</h2>
        <Tabs defaultValue="proximas">
          <TabsList>
            <TabsTrigger value="proximas">Próximas ({defensasAsignadas.length})</TabsTrigger>
            <TabsTrigger value="historial">Historial ({historialDefensas.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="proximas" className="space-y-3 mt-4">
            {defensasAsignadas.length === 0 ? (
              <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Sin defensas programadas.</CardContent></Card>
            ) : defensasAsignadas.map(d => (
              <Card key={d.id}>
                <CardContent className="py-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{d.proyectoTitulo}</p>
                      <p className="text-sm text-muted-foreground">{d.estudiante?.nombre} {d.estudiante?.apellido} · {MODALIDADES[d.modalidad]}</p>
                    </div>
                    <Badge variant="outline">{d.tipo === 'publica' ? 'Pública' : 'Privada'}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span><Calendar className="w-3 h-3 inline mr-1" />{formatFecha(d.fecha, 'dd/MM/yyyy HH:mm')}</span>
                    <span>{d.sala}</span>
                    <span>Rol: <span className="font-medium">{d.rolEnTribunal === 'vocal1' ? 'Vocal 1' : d.rolEnTribunal === 'vocal2' ? 'Vocal 2' : 'Presidente'}</span></span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="historial" className="space-y-3 mt-4">
            {historialDefensas.map(d => (
              <Card key={d.id}>
                <CardContent className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{d.proyectoTitulo}</p>
                    <p className="text-xs text-muted-foreground">{d.estudiante} · {formatFecha(d.fecha)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{d.notaFinal}/100</p>
                    <Badge variant={d.resultado === 'aprobado' ? 'default' : 'destructive'} className="text-xs">{d.resultado === 'aprobado' ? 'Aprobado' : 'Reprobado'}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  // Director / Secretaria
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">Gestión de Tribunales</h2>

      <FeedbackBanner feedback={feedback} onClear={() => setFeedback(null)} />

      <Tabs defaultValue="tribunales">
        <TabsList>
          <TabsTrigger value="tribunales">Tribunales ({conTribunal.length})</TabsTrigger>
          <TabsTrigger value="pendientes">Sin tribunal ({sinTribunal.length})</TabsTrigger>
          <TabsTrigger value="defensas">Defensas programadas ({conDefensa.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="tribunales" className="space-y-3 mt-4">
          {conTribunal.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Sin tribunales asignados.</CardContent></Card>
          ) : conTribunal.map(p => (
            <Card key={p.id}>
              <CardContent className="py-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{p.titulo}</p>
                    <p className="text-sm text-muted-foreground">{p.estudiante?.nombre} {p.estudiante?.apellido}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getBadgeVariant(p.estado)} className="text-xs">{getEstadoLabel(p.estado)}</Badge>
                    {esDirector && !tieneDefensaProgramada(p) && !['graduado'].includes(p.estado) && (
                      <Button size="sm" variant="outline"
                        onClick={() => { setFormDefensa({ tipo: 'privada', fecha: '', hora: '', sala: '' }); setDialogDefensa(p) }}>
                        <Calendar className="w-3 h-3 mr-1" />Programar defensa
                      </Button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[['Presidente', p.tribunal.presidente], ['Vocal 1', p.tribunal.vocal1], ['Vocal 2', p.tribunal.vocal2]].map(([rol, m]) => (
                    <div key={rol} className="p-2 rounded bg-muted">
                      <p className="text-muted-foreground">{rol}</p>
                      <p className="font-medium">{m?.nombre} {m?.apellido}</p>
                    </div>
                  ))}
                </div>
                {tieneDefensaProgramada(p) && p.defensas.filter(d => d.estado === 'programada').map(d => (
                  <div key={d.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Defensa {d.tipo}: {formatFecha(d.fecha, 'dd/MM/yyyy HH:mm')} — {d.sala}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pendientes" className="space-y-3 mt-4">
          {sinTribunal.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Todos los proyectos tienen tribunal asignado.</CardContent></Card>
          ) : sinTribunal.map(p => (
            <Card key={p.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{p.titulo}</p>
                    <p className="text-sm text-muted-foreground">{p.estudiante?.nombre} {p.estudiante?.apellido} · {MODALIDADES[p.modalidad]}</p>
                    <Badge variant={getBadgeVariant(p.estado)} className="text-xs mt-1">{getEstadoLabel(p.estado)}</Badge>
                  </div>
                  {esDirector && (
                    <Button size="sm"
                      onClick={() => { setFormTribunal({ presidente: '', vocal1: '', vocal2: '' }); setDialogTribunal(p) }}>
                      <Users className="w-3 h-3 mr-1" />Asignar tribunal
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="defensas" className="space-y-3 mt-4">
          {conDefensa.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Sin defensas programadas.</CardContent></Card>
          ) : conDefensa.map(p =>
            p.defensas.filter(d => d.estado === 'programada').map(d => (
              <Card key={d.id}>
                <CardContent className="py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{p.titulo}</p>
                      <p className="text-xs text-muted-foreground">{p.estudiante?.nombre} {p.estudiante?.apellido}</p>
                      <p className="text-xs text-muted-foreground mt-1"><Calendar className="w-3 h-3 inline mr-1" />{formatFecha(d.fecha, 'dd/MM/yyyy HH:mm')} · {d.sala}</p>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">Defensa {d.tipo}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog: Asignar tribunal */}
      <Dialog open={!!dialogTribunal} onOpenChange={open => !open && setDialogTribunal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Asignar tribunal
            </DialogTitle>
            <DialogDescription>{dialogTribunal?.titulo}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                El tutor interno del proyecto no puede ser miembro del tribunal.
              </AlertDescription>
            </Alert>
            {[
              ['presidente', 'Presidente'],
              ['vocal1', 'Vocal 1'],
              ['vocal2', 'Vocal 2'],
            ].map(([key, label]) => (
              <SelectField key={key} label={label} required
                value={formTribunal[key]}
                onChange={v => setFormTribunal(p => ({ ...p, [key]: v }))}>
                {DOCENTES_DISPONIBLES
                  .filter(d => !rolesUsados(formTribunal, key).includes(d.id))
                  .map(d => (
                    <option key={d.id} value={d.id}>{d.nombre} {d.apellido}</option>
                  ))}
              </SelectField>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogTribunal(null)}>Cancelar</Button>
            <Button
              onClick={handleAsignarTribunal}
              disabled={!formTribunal.presidente || !formTribunal.vocal1 || !formTribunal.vocal2}>
              <Users className="w-3 h-3 mr-1" />Confirmar asignación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Programar defensa */}
      <Dialog open={!!dialogDefensa} onOpenChange={open => !open && setDialogDefensa(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Programar defensa
            </DialogTitle>
            <DialogDescription>{dialogDefensa?.titulo}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <SelectField label="Tipo de defensa" required
              value={formDefensa.tipo}
              onChange={v => setFormDefensa(p => ({ ...p, tipo: v }))}>
              <option value="privada">Privada</option>
              <option value="publica">Pública</option>
            </SelectField>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Fecha *</label>
                <input type="date"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formDefensa.fecha}
                  onChange={e => setFormDefensa(p => ({ ...p, fecha: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Hora *</label>
                <input type="time"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formDefensa.hora}
                  onChange={e => setFormDefensa(p => ({ ...p, hora: e.target.value }))}
                />
              </div>
            </div>
            <SelectField label="Sala" required
              value={formDefensa.sala}
              onChange={v => setFormDefensa(p => ({ ...p, sala: v }))}>
              {SALAS.map(s => <option key={s} value={s}>{s}</option>)}
            </SelectField>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogDefensa(null)}>Cancelar</Button>
            <Button
              onClick={handleProgramarDefensa}
              disabled={!formDefensa.fecha || !formDefensa.hora || !formDefensa.sala}>
              <Calendar className="w-3 h-3 mr-1" />Programar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
