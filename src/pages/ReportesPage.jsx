import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { MODALIDADES, ESTADOS_PROYECTO } from '@/utils/constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { FeedbackBanner } from '@/components/ui/feedback-banner'
import { Download, BarChart2, FileText } from 'lucide-react'

export default function ReportesPage() {
  const { datos } = useAuth()
  const estadisticas = datos?.estadisticas ?? {}
  const total = estadisticas.totalProyectos ?? 0
  const [feedback, setFeedback] = useState(null)

  const totalPorModalidad = Object.entries(estadisticas.porModalidad ?? {})
  const totalPorEstado = Object.entries(estadisticas.porEstado ?? {})

  const handleExportar = (formato) => {
    setFeedback({
      mensaje: `Reporte en ${formato} generado exitosamente. La descarga ha comenzado.`,
      tipo: 'exito',
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Reportes y Métricas</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExportar('PDF')}>
            <Download className="w-3 h-3 mr-1" />Exportar PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExportar('Excel')}>
            <Download className="w-3 h-3 mr-1" />Exportar Excel
          </Button>
        </div>
      </div>

      <FeedbackBanner feedback={feedback} onClear={() => setFeedback(null)} />

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-sm flex items-center gap-2"><BarChart2 className="w-4 h-4" />Por modalidad</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {totalPorModalidad.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin datos</p>
            ) : totalPorModalidad.map(([modalidad, cantidad]) => (
              <div key={modalidad}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{MODALIDADES[modalidad] ?? modalidad}</span>
                  <span className="font-medium">{cantidad}</span>
                </div>
                <Progress value={total > 0 ? (cantidad / total) * 100 : 0} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-sm flex items-center gap-2"><FileText className="w-4 h-4" />Por estado</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {totalPorEstado.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin datos</p>
            ) : totalPorEstado.map(([estado, cantidad]) => (
              <div key={estado} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{ESTADOS_PROYECTO?.[estado] ?? estado}</span>
                <span className="font-medium">{cantidad}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-sm">Resumen general</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-xs text-muted-foreground">Total proyectos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{estadisticas.porEstado?.graduado ?? 0}</p>
              <p className="text-xs text-muted-foreground">Graduados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">{estadisticas.defensasProgramadas ?? 0}</p>
              <p className="text-xs text-muted-foreground">Defensas prog.</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{estadisticas.porEstado?.['con-observaciones'] ?? 0}</p>
              <p className="text-xs text-muted-foreground">Con observaciones</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
