import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatFecha } from '@/utils/helpers'
import { Award, Clock } from 'lucide-react'

export default function DashboardTribunal({ usuario }) {
  const { datos } = useAuth()
  const navigate = useNavigate()
  const { defensasAsignadas = [], actasPendientesFirma = [], historialDefensas = [], notificaciones = [] } = datos
  const noLeidas = notificaciones.filter(n => !n.leida)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Bienvenido, {usuario?.nombre}</h2>
        <p className="text-sm text-muted-foreground">Panel de Tribunal</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold">{defensasAsignadas.length}</p><p className="text-xs text-muted-foreground mt-1">Defensas asignadas</p></CardContent></Card>
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold text-warning">{actasPendientesFirma.length}</p><p className="text-xs text-muted-foreground mt-1">Actas por firmar</p></CardContent></Card>
        <Card><CardContent className="pt-6 pb-4 text-center"><p className="text-2xl font-bold">{historialDefensas.length}</p><p className="text-xs text-muted-foreground mt-1">Defensas realizadas</p></CardContent></Card>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Próximas defensas</h3>
          <Button variant="outline" size="sm" onClick={() => navigate('/tribunales')}>Ver todas</Button>
        </div>
        {defensasAsignadas.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">Sin defensas próximas</CardContent></Card>
        ) : defensasAsignadas.map(d => (
          <Card key={d.id}>
            <CardContent className="py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{d.proyectoTitulo}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.estudiante?.nombre} {d.estudiante?.apellido}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span><Clock className="w-3 h-3 inline mr-1" />{formatFecha(d.fecha, 'dd/MM/yyyy HH:mm')}</span>
                    <span>{d.sala}</span>
                    <span>Rol: {d.rolEnTribunal === 'vocal1' ? 'Vocal 1' : 'Vocal 2'}</span>
                  </div>
                </div>
                <Badge variant="outline">{d.tipo === 'publica' ? 'Pública' : 'Privada'}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {historialDefensas.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Historial de defensas</h3>
          {historialDefensas.map(d => (
            <Card key={d.id}>
              <CardContent className="py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{d.proyectoTitulo}</p>
                    <p className="text-xs text-muted-foreground">{d.estudiante} · {formatFecha(d.fecha)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{d.notaFinal}/100</p>
                    <Badge variant={d.resultado === 'aprobado' ? 'default' : 'destructive'} className="text-xs">{d.resultado === 'aprobado' ? 'Aprobado' : 'Reprobado'}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
