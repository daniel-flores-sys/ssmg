import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ROLES_LABELS } from '@/utils/constants'
import { formatFecha } from '@/utils/helpers'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FeedbackBanner } from '@/components/ui/feedback-banner'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { Search, UserPlus, Edit, UserX } from 'lucide-react'

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  )
}

const FORM_INICIAL = { nombre: '', apellido: '', email: '', ci: '', telefono: '', rol: '' }

export default function UsuariosPage() {
  const { datos } = useAuth()
  const [busqueda, setBusqueda] = useState('')
  const [filtroRol, setFiltroRol] = useState('todos')
  const [usuarios, setUsuarios] = useState(datos?.usuarios ?? [])
  const [feedback, setFeedback] = useState(null)
  const [dialogNuevo, setDialogNuevo] = useState(false)
  const [form, setForm] = useState(FORM_INICIAL)

  const usuariosFiltrados = usuarios.filter(u => {
    const matchBusqueda = busqueda === '' ||
      `${u.nombre} ${u.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.ci.includes(busqueda)
    const matchRol = filtroRol === 'todos' || u.rol === filtroRol
    return matchBusqueda && matchRol
  })

  const setField = (key, val) => setForm(p => ({ ...p, [key]: val }))

  const handleCrear = () => {
    if (!form.nombre.trim() || !form.apellido.trim() || !form.email.trim() || !form.ci.trim() || !form.rol) return
    const nuevo = {
      id: `u_${Date.now()}`,
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      email: form.email.trim(),
      ci: form.ci.trim(),
      telefono: form.telefono.trim(),
      rol: form.rol,
      activo: true,
      fechaRegistro: new Date().toISOString(),
    }
    setUsuarios(prev => [nuevo, ...prev])
    setForm(FORM_INICIAL)
    setDialogNuevo(false)
    setFeedback({ mensaje: `Usuario ${nuevo.nombre} ${nuevo.apellido} creado exitosamente. Se enviaron las credenciales a ${nuevo.email}.`, tipo: 'exito' })
  }

  const formValido = form.nombre.trim() && form.apellido.trim() && form.email.trim() && form.ci.trim() && form.rol

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Gestión de Usuarios</h2>
        <Button size="sm" onClick={() => { setForm(FORM_INICIAL); setDialogNuevo(true) }}>
          <UserPlus className="w-4 h-4 mr-2" />Nuevo usuario
        </Button>
      </div>

      <FeedbackBanner feedback={feedback} onClear={() => setFeedback(null)} />

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, email o CI..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filtroRol} onValueChange={setFiltroRol}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los roles</SelectItem>
            {Object.entries(ROLES_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>CI</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead className="w-20">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuariosFiltrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Sin usuarios que coincidan.
                </TableCell>
              </TableRow>
            ) : usuariosFiltrados.map(u => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.nombre} {u.apellido}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                <TableCell className="text-sm">{u.ci}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{ROLES_LABELS[u.rol]}</Badge></TableCell>
                <TableCell>
                  <Badge variant={u.activo ? 'default' : 'secondary'} className="text-xs">
                    {u.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatFecha(u.fechaRegistro)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-xs"><Edit className="w-3 h-3" /></Button>
                    <Button variant="ghost" size="icon-xs" className="text-destructive"><UserX className="w-3 h-3" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Dialog: Nuevo usuario */}
      <Dialog open={dialogNuevo} onOpenChange={setDialogNuevo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              Nuevo usuario
            </DialogTitle>
            <DialogDescription>Se enviarán las credenciales de acceso al correo registrado.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nombre *">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ej. Ana"
                  value={form.nombre}
                  onChange={e => setField('nombre', e.target.value)}
                />
              </Field>
              <Field label="Apellido *">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ej. García Torrez"
                  value={form.apellido}
                  onChange={e => setField('apellido', e.target.value)}
                />
              </Field>
            </div>
            <Field label="Correo electrónico *">
              <input
                type="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="usuario@usfx.bo"
                value={form.email}
                onChange={e => setField('email', e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="CI *">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ej. 9876543"
                  value={form.ci}
                  onChange={e => setField('ci', e.target.value)}
                />
              </Field>
              <Field label="Teléfono">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ej. 76543210"
                  value={form.telefono}
                  onChange={e => setField('telefono', e.target.value)}
                />
              </Field>
            </div>
            <Field label="Rol *">
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.rol}
                onChange={e => setField('rol', e.target.value)}
              >
                <option value="">— Seleccionar rol —</option>
                {Object.entries(ROLES_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogNuevo(false)}>Cancelar</Button>
            <Button onClick={handleCrear} disabled={!formValido}>
              <UserPlus className="w-3 h-3 mr-1" />Crear usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
