import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { TIPOS_NOTIFICACION } from '@/utils/constants'
import { formatFechaHora } from '@/utils/helpers'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Info, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react'

const TIPO_CONFIG = {
  info: { icon: Info, color: 'text-primary', bg: 'bg-primary/10' },
  alerta: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
  urgente: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  exito: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
}

export default function NotificacionesPage() {
  const { datos } = useAuth()
  const [notificaciones, setNotificaciones] = useState(datos?.notificaciones ?? [])

  const marcarTodas = () => setNotificaciones(n => n.map(x => ({ ...x, leida: true })))
  const noLeidas = notificaciones.filter(n => !n.leida).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Notificaciones</h2>
          {noLeidas > 0 && <p className="text-sm text-muted-foreground">{noLeidas} sin leer</p>}
        </div>
        {noLeidas > 0 && (
          <Button variant="outline" size="sm" onClick={marcarTodas}>
            Marcar todas como leídas
          </Button>
        )}
      </div>

      {notificaciones.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-2">
            <Bell className="w-10 h-10 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Sin notificaciones</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {notificaciones.map(n => {
            const config = TIPO_CONFIG[n.tipo] ?? TIPO_CONFIG.info
            const Icon = config.icon
            return (
              <Card key={n.id} className={n.leida ? 'opacity-60' : ''}>
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${config.bg}`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{n.titulo}</p>
                        {!n.leida && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{n.mensaje}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatFechaHora(n.fecha)}</p>
                    </div>
                    <Badge variant="outline" className="text-xs flex-shrink-0">{TIPOS_NOTIFICACION[n.tipo] ?? n.tipo}</Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
