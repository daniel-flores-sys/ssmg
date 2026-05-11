import { useState, useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, List, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameDay, isSameMonth, format,
  addMonths, subMonths, isToday, isPast, compareAsc,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'

const TIPO_CONFIG = {
  'defensa-publica': {
    label: 'Defensa pública',
    dot: 'bg-success',
    chip: 'bg-success/15 text-success border-success/30',
    icon: 'bg-success/15 border-success/30 text-success',
  },
  'defensa-privada': {
    label: 'Defensa privada',
    dot: 'bg-primary',
    chip: 'bg-primary/10 text-primary border-primary/20',
    icon: 'bg-primary/10 border-primary/20 text-primary',
  },
  'perfil': {
    label: 'Revisión de perfil',
    dot: 'bg-warning',
    chip: 'bg-warning/20 text-warning-foreground border-warning/40',
    icon: 'bg-warning/20 border-warning/40 text-warning-foreground',
  },
  'revision': {
    label: 'Revisión de avance',
    dot: 'bg-muted-foreground',
    chip: 'bg-muted text-muted-foreground border-border',
    icon: 'bg-muted border-border text-muted-foreground',
  },
}

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export default function CalendarioPage() {
  const { datos } = useAuth()
  const eventos = useMemo(
    () => [...(datos?.eventosCalendario ?? [])].sort(
      (a, b) => compareAsc(new Date(a.fecha), new Date(b.fecha))
    ),
    [datos]
  )

  const [vista, setVista] = useState('calendario')
  const [mesActual, setMesActual] = useState(new Date())
  const [diaSeleccionado, setDiaSeleccionado] = useState(null)

  const diasGrid = useMemo(() => {
    const inicio = startOfWeek(startOfMonth(mesActual), { weekStartsOn: 1 })
    const fin = endOfWeek(endOfMonth(mesActual), { weekStartsOn: 1 })
    return eachDayOfInterval({ start: inicio, end: fin })
  }, [mesActual])

  const eventosDia = (dia) =>
    eventos.filter((ev) => isSameDay(new Date(ev.fecha), dia))

  const eventosSeleccionados = diaSeleccionado ? eventosDia(diaSeleccionado) : []

  const proximosEventos = eventos.filter(
    (ev) => !isPast(new Date(ev.fecha)) || isToday(new Date(ev.fecha))
  ).slice(0, 5)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Calendario Académico</h2>
        <div className="flex items-center gap-0.5 bg-muted rounded-lg p-1">
          <Button
            variant={vista === 'calendario' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setVista('calendario')}
            className="h-7 px-3"
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            Mes
          </Button>
          <Button
            variant={vista === 'lista' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setVista('lista')}
            className="h-7 px-3"
          >
            <List className="w-3.5 h-3.5 mr-1.5" />
            Lista
          </Button>
        </div>
      </div>

      {vista === 'calendario' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 items-start">
          {/* Grid de mes */}
          <Card>
            <CardHeader className="pb-2 px-4 pt-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => { setMesActual(subMonths(mesActual, 1)); setDiaSeleccionado(null) }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <CardTitle className="text-sm font-semibold capitalize">
                  {format(mesActual, 'MMMM yyyy', { locale: es })}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => { setMesActual(addMonths(mesActual, 1)); setDiaSeleccionado(null) }}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              {/* Encabezado de días */}
              <div className="grid grid-cols-7 mb-1">
                {DIAS_SEMANA.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1.5">
                    {d}
                  </div>
                ))}
              </div>
              {/* Celdas de días */}
              <div className="grid grid-cols-7 gap-0.5">
                {diasGrid.map((dia) => {
                  const evsDia = eventosDia(dia)
                  const esMesActual = isSameMonth(dia, mesActual)
                  const esHoy = isToday(dia)
                  const seleccionado = diaSeleccionado && isSameDay(dia, diaSeleccionado)

                  return (
                    <button
                      key={dia.toISOString()}
                      onClick={() => setDiaSeleccionado(seleccionado ? null : dia)}
                      className={cn(
                        'relative flex flex-col items-center py-1.5 px-0.5 rounded-lg transition-colors min-h-13',
                        !esMesActual && 'opacity-25',
                        esMesActual && !seleccionado && 'hover:bg-muted',
                        seleccionado && 'bg-primary/10 ring-1 ring-primary/30',
                      )}
                    >
                      <span
                        className={cn(
                          'w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium',
                          esHoy && 'bg-primary text-primary-foreground font-bold',
                          !esHoy && esMesActual && 'text-foreground',
                        )}
                      >
                        {format(dia, 'd')}
                      </span>
                      {evsDia.length > 0 && (
                        <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center max-w-full">
                          {evsDia.slice(0, 3).map((ev, i) => (
                            <span
                              key={i}
                              className={cn(
                                'w-1.5 h-1.5 rounded-full shrink-0',
                                TIPO_CONFIG[ev.tipo]?.dot ?? 'bg-muted-foreground',
                              )}
                            />
                          ))}
                          {evsDia.length > 3 && (
                            <span className="text-[9px] text-muted-foreground leading-none">+{evsDia.length - 3}</span>
                          )}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Leyenda */}
              <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-border">
                {Object.entries(TIPO_CONFIG).map(([tipo, cfg]) => (
                  <div key={tipo} className="flex items-center gap-1.5">
                    <span className={cn('w-2 h-2 rounded-full', cfg.dot)} />
                    <span className="text-xs text-muted-foreground">{cfg.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Panel lateral */}
          <div className="space-y-3">
            {/* Eventos del día seleccionado */}
            {diaSeleccionado && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground capitalize">
                  {format(diaSeleccionado, "EEEE d 'de' MMMM", { locale: es })}
                </p>
                {eventosSeleccionados.length === 0 ? (
                  <Card>
                    <CardContent className="py-5 text-center">
                      <p className="text-xs text-muted-foreground">Sin eventos este día</p>
                    </CardContent>
                  </Card>
                ) : (
                  eventosSeleccionados.map((ev) => <EventoCard key={ev.id} evento={ev} />)
                )}
              </div>
            )}

            {/* Próximos eventos */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Próximos eventos</p>
              {proximosEventos.length === 0 ? (
                <Card>
                  <CardContent className="py-5 text-center">
                    <p className="text-xs text-muted-foreground">Sin eventos próximos</p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-2 px-3 divide-y divide-border">
                    {proximosEventos.map((ev) => {
                      const cfg = TIPO_CONFIG[ev.tipo] ?? TIPO_CONFIG['revision']
                      return (
                        <div key={ev.id} className="flex items-start gap-2.5 py-2.5">
                          <span className={cn('w-2 h-2 rounded-full shrink-0 mt-1.5', cfg.dot)} />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{ev.titulo}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {format(new Date(ev.fecha), "d MMM · HH:mm", { locale: es })}
                              {ev.sala && ` · ${ev.sala}`}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Vista de lista */
        <div className="space-y-3">
          {eventos.length === 0 ? (
            <Card>
              <CardContent className="py-14 text-center space-y-2">
                <Calendar className="w-10 h-10 mx-auto text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Sin eventos programados</p>
                <p className="text-xs text-muted-foreground">Los eventos aparecerán aquí cuando se programen defensas y revisiones.</p>
              </CardContent>
            </Card>
          ) : (
            eventos.map((ev) => <EventoCard key={ev.id} evento={ev} full />)
          )}
        </div>
      )}
    </div>
  )
}

function EventoCard({ evento, full }) {
  const cfg = TIPO_CONFIG[evento.tipo] ?? TIPO_CONFIG['revision']
  const pasado = isPast(new Date(evento.fecha)) && !isToday(new Date(evento.fecha))

  return (
    <Card className={cn(pasado && 'opacity-60')}>
      <CardContent className="py-3 px-4">
        <div className="flex items-start gap-3">
          <div className={cn('p-1.5 rounded-md border shrink-0 mt-0.5', cfg.icon)}>
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{evento.titulo}</p>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {format(new Date(evento.fecha), full ? 'EEEE d MMM yyyy · HH:mm' : 'dd/MM · HH:mm', { locale: es })}
              </span>
              {evento.sala && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {evento.sala}
                </span>
              )}
            </div>
          </div>
          <Badge variant="outline" className={cn('text-xs border shrink-0', cfg.chip)}>
            {cfg.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
