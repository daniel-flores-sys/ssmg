import { format, parseISO, differenceInHours, isAfter } from 'date-fns'
import { es } from 'date-fns/locale'
import { ESTADOS_PROYECTO, MODALIDADES, ROLES_LABELS } from './constants'

export const formatFecha = (isoString, formatStr = 'dd/MM/yyyy') => {
  if (!isoString) return '—'
  try {
    return format(parseISO(isoString), formatStr, { locale: es })
  } catch {
    return '—'
  }
}

export const formatFechaHora = (isoString) =>
  formatFecha(isoString, "dd/MM/yyyy HH:mm")

export const getEstadoLabel = (estado) =>
  ESTADOS_PROYECTO[estado] ?? estado

export const getModalidadLabel = (modalidad) =>
  MODALIDADES[modalidad] ?? modalidad

export const getRolLabel = (rol) =>
  ROLES_LABELS[rol] ?? rol

export const estaEnVentanaFirma = (fechaApertura) => {
  if (!fechaApertura) return false
  const apertura = parseISO(fechaApertura)
  const ahora = new Date()
  const horas = differenceInHours(ahora, apertura)
  return horas >= 0 && horas < 1
}

export const puedeEditarAvance = (fechaCreacion) => {
  if (!fechaCreacion) return false
  const creacion = parseISO(fechaCreacion)
  const limite = new Date(creacion.getTime() + 24 * 60 * 60 * 1000)
  return isAfter(limite, new Date())
}

export const calcularPorcentajeAvance = (avances) => {
  if (!avances || avances.length === 0) return 0
  const aprobados = avances.filter(a => a.estado === 'aprobado')
  if (aprobados.length === 0) return 0
  return Math.round(aprobados.reduce((sum, a) => sum + (a.porcentaje || 0), 0) / aprobados.length)
}

export const getBadgeVariant = (estado) => {
  const map = {
    borrador: 'secondary',
    'en-revision': 'outline',
    'perfil-aprobado': 'default',
    'tribunal-asignado': 'default',
    'con-observaciones': 'destructive',
    'defensa-privada-programada': 'outline',
    'defensa-privada-aprobada': 'default',
    'defensa-publica-programada': 'outline',
    aprobado: 'default',
    reprobado: 'destructive',
    graduado: 'default',
    aprobado_avance: 'default',
    pendiente: 'outline',
    rechazado: 'destructive',
  }
  return map[estado] ?? 'secondary'
}

export const getInitials = (nombre, apellido) => {
  const n = nombre?.[0] ?? ''
  const a = apellido?.[0] ?? ''
  return `${n}${a}`.toUpperCase()
}

export const generarId = () => crypto.randomUUID()
