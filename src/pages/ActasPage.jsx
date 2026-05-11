import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FeedbackBanner } from '@/components/ui/feedback-banner'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { FileSignature, Clock, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react'
import { HORAS_VENTANA_FIRMA } from '@/utils/constants'
import { formatFecha } from '@/utils/helpers'
import { cn } from '@/lib/utils'

function ActaCard({ acta, onFirmar, usuario }) {
  const todasFirmadas = acta.firmas.every(f => f.firmado)

  const miFirma = acta.firmas.find(f =>
    f.nombre.toLowerCase().includes((usuario?.apellido ?? '').toLowerCase())
  )
  const miIdx = miFirma ? acta.firmas.indexOf(miFirma) : -1
  const puedoFirmar = miFirma && !miFirma.firmado &&
    (miIdx === 0 || acta.firmas[miIdx - 1].firmado)
  const primeraPendiente = acta.firmas.find(f => !f.firmado)

  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-sm">{acta.proyectoTitulo}</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{acta.estudiante}</p>
          </div>
          {todasFirmadas
            ? <Badge className="border border-success/30 bg-success/10 text-success">Completada</Badge>
            : <Badge variant="destructive">Pendiente</Badge>}
        </div>
      </CardHeader>
      <CardContent className="pt-3 space-y-3">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>Defensa {acta.tipoDefensa}</span>
          <span>·</span>
          <span>{acta.sala}</span>
          {acta.notaDocumento && (
            <><span>·</span><span>Nota doc: <strong className="text-foreground">{acta.notaDocumento}/50</strong></span></>
          )}
          <span>·</span>
          <span>Apertura: {formatFecha(acta.fechaApertura, 'dd/MM HH:mm')}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {acta.firmas.map((firma, i) => (
            <div key={firma.rol} className={cn(
              'p-2.5 rounded-lg border text-xs',
              firma.firmado ? 'border-success bg-success/10' : 'border-border bg-muted'
            )}>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{firma.rol}</p>
              <p className="font-medium mt-0.5 leading-tight text-foreground">
                {firma.nombre.split(' ').slice(0, 2).join(' ')}
              </p>
              <p className={cn('mt-1.5 flex items-center gap-1', firma.firmado ? 'text-success' : 'text-muted-foreground')}>
                {firma.firmado
                  ? <><CheckCircle2 className="w-3 h-3" />Firmado</>
                  : i > 0 && !acta.firmas[i - 1].firmado
                  ? <><Clock className="w-3 h-3" />En espera</>
                  : <><Clock className="w-3 h-3" />Pendiente</>}
              </p>
              {firma.firmado && firma.fechaFirma && (
                <p className="text-[10px] text-muted-foreground mt-0.5">{formatFecha(firma.fechaFirma, 'HH:mm')}</p>
              )}
            </div>
          ))}
        </div>

        {!todasFirmadas && (
          puedoFirmar
            ? <Button size="sm" onClick={() => onFirmar(acta)}>
                <FileSignature className="w-3 h-3 mr-1" />Firmar acta
              </Button>
            : primeraPendiente && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Esperando firma de: {primeraPendiente.rol} — {primeraPendiente.nombre.split(' ').slice(0,2).join(' ')}
              </p>
            )
        )}
      </CardContent>
    </Card>
  )
}

export default function ActasPage() {
  const { datos, usuario } = useAuth()
  const [actas, setActas] = useState(datos?.actasPendientesFirma ?? [])
  const [actaFirmando, setActaFirmando] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const mostrarFeedback = (mensaje, tipo = 'exito') => setFeedback({ mensaje, tipo })

  const handleFirmar = () => {
    if (!actaFirmando) return
    setActas(prev => prev.map(a => {
      if (a.id !== actaFirmando.id) return a
      return {
        ...a,
        firmas: a.firmas.map(f =>
          f.nombre.toLowerCase().includes((usuario?.apellido ?? '').toLowerCase())
            ? { ...f, firmado: true, fechaFirma: new Date().toISOString() }
            : f
        ),
      }
    }))
    setActaFirmando(null)
    mostrarFeedback('Firma digital registrada exitosamente. El acta ha sido actualizada.')
  }

  const pendientes = actas.filter(a => !a.firmas.every(f => f.firmado))
  const completadas = actas.filter(a => a.firmas.every(f => f.firmado))

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold">Firma de Actas</h2>

      <FeedbackBanner feedback={feedback} onClear={() => setFeedback(null)} />

      <Alert>
        <Clock className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Orden estricto: <strong>Presidente → Vocal 1 → Vocal 2</strong>.
          Ventana de firma: <strong>{HORAS_VENTANA_FIRMA} hora</strong> desde apertura del acta.
        </AlertDescription>
      </Alert>

      {actas.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-2">
            <FileSignature className="w-10 h-10 mx-auto text-muted-foreground" />
            <p className="text-sm font-medium">Sin actas pendientes de firma</p>
            <p className="text-sm text-muted-foreground">Las actas aparecerán aquí cuando se realice una defensa.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pendientes.map(a => (
            <ActaCard key={a.id} acta={a} onFirmar={setActaFirmando} usuario={usuario} />
          ))}
          {completadas.length > 0 && (
            <>
              <p className="text-xs font-semibold text-muted-foreground pt-2">Actas completadas</p>
              {completadas.map(a => (
                <ActaCard key={a.id} acta={a} onFirmar={setActaFirmando} usuario={usuario} />
              ))}
            </>
          )}
        </div>
      )}

      <Dialog open={!!actaFirmando} onOpenChange={open => !open && setActaFirmando(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Confirmar firma digital
            </DialogTitle>
            <DialogDescription>{actaFirmando?.proyectoTitulo}</DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="rounded-lg bg-muted p-3 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estudiante</span>
                <span className="font-medium">{actaFirmando?.estudiante}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo de defensa</span>
                <span className="font-medium capitalize">{actaFirmando?.tipoDefensa}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sala</span>
                <span className="font-medium">{actaFirmando?.sala}</span>
              </div>
              {actaFirmando?.notaDocumento && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nota documento</span>
                  <span className="font-medium">{actaFirmando.notaDocumento}/50</span>
                </div>
              )}
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Al confirmar, su firma digital queda registrada de forma <strong>permanente e inmutable</strong>.
                Esta acción no puede deshacerse.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActaFirmando(null)}>Cancelar</Button>
            <Button onClick={handleFirmar}>
              <FileSignature className="w-3 h-3 mr-1" />Confirmar firma
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
