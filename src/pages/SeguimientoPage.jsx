import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ROLES, TIPOS_EVENTO } from '@/utils/constants'
import { formatFechaHora } from '@/utils/helpers'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GitCommitHorizontal, FileText, AlertCircle, RefreshCw, Star, MessageSquare } from 'lucide-react'

const TIPO_ICONS = {
  revision: FileText,
  'informe-institucional': FileText,
  comentario: MessageSquare,
  'cambio-estado': RefreshCw,
  'cambio-modalidad': RefreshCw,
  hito: Star,
}

const TIPO_COLORS = {
  revision: 'text-primary',
  'informe-institucional': 'text-primary',
  comentario: 'text-muted-foreground',
  'cambio-estado': 'text-warning',
  'cambio-modalidad': 'text-destructive',
  hito: 'text-success',
}

export default function SeguimientoPage() {
  const { datos, rolActivo } = useAuth()
  const [filtroTipo, setFiltroTipo] = useState('todos')

  const eventos = datos?.seguimiento ?? []
  const eventosFiltrados = filtroTipo === 'todos' ? eventos : eventos.filter(e => e.tipo === filtroTipo)

  if (rolActivo !== ROLES.ESTUDIANTE) {
    return (
      <div className="space-y-4">
        <h2 className="text-base font-semibold">Seguimiento</h2>
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">El seguimiento está disponible en el detalle de cada proyecto.</CardContent></Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Seguimiento del Proyecto</h2>
        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Tipo de evento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los eventos</SelectItem>
            {Object.entries(TIPOS_EVENTO).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {eventosFiltrados.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">Sin eventos de seguimiento.</CardContent></Card>
      ) : (
        <div className="relative pl-6 border-l-2 border-border space-y-6">
          {eventosFiltrados.map(ev => {
            const Icon = TIPO_ICONS[ev.tipo] ?? GitCommitHorizontal
            const color = TIPO_COLORS[ev.tipo] ?? 'text-muted-foreground'
            return (
              <div key={ev.id} className="relative">
                <div className={`absolute -left-[29px] p-1 rounded-full bg-background border-2 border-border ${color}`}>
                  <Icon className="w-3 h-3" />
                </div>
                <Card>
                  <CardContent className="py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm">{ev.descripcion}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatFechaHora(ev.fecha)} · {ev.autor}</p>
                      </div>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{TIPOS_EVENTO[ev.tipo] ?? ev.tipo}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
