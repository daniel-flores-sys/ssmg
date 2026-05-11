export const ROLES = {
  DIRECTOR: 'director',
  SECRETARIA: 'secretaria',
  TUTOR_INTERNO: 'tutor-interno',
  TUTOR_EXTERNO: 'tutor-externo',
  TRIBUNAL: 'tribunal',
  ESTUDIANTE: 'estudiante',
  ADMINISTRADOR: 'administrador',
}

export const ROLES_LABELS = {
  director: 'Director de Carrera',
  secretaria: 'Secretaria',
  'tutor-interno': 'Tutor Interno',
  'tutor-externo': 'Tutor Externo',
  tribunal: 'Tribunal',
  estudiante: 'Estudiante',
  administrador: 'Administrador',
}

export const MODALIDADES = {
  'MOD-TES': 'Tesis de Grado',
  'MOD-PRG': 'Proyecto de Grado',
  'MOD-TRD': 'Trabajo Dirigido',
  'MOD-INT': 'Internado',
  'MOD-EXG': 'Examen de Grado',
}

export const ESTADOS_PROYECTO = {
  borrador: 'Borrador',
  'en-revision': 'En Revisión',
  'perfil-aprobado': 'Perfil Aprobado',
  'tribunal-asignado': 'Tribunal Asignado',
  'con-observaciones': 'Con Observaciones',
  'defensa-privada-programada': 'Defensa Privada Programada',
  'defensa-privada-aprobada': 'Defensa Privada Aprobada',
  'defensa-publica-programada': 'Defensa Pública Programada',
  aprobado: 'Aprobado',
  reprobado: 'Reprobado',
  graduado: 'Graduado',
}

export const ESTADO_COLORES = {
  borrador: 'secondary',
  'en-revision': 'warning',
  'perfil-aprobado': 'success',
  'tribunal-asignado': 'default',
  'con-observaciones': 'destructive',
  'defensa-privada-programada': 'warning',
  'defensa-privada-aprobada': 'success',
  'defensa-publica-programada': 'warning',
  aprobado: 'success',
  reprobado: 'destructive',
  graduado: 'success',
}

export const TIPOS_EVENTO = {
  revision: 'Revisión',
  'informe-institucional': 'Informe Institucional',
  comentario: 'Comentario',
  'cambio-estado': 'Cambio de Estado',
  'cambio-modalidad': 'Cambio de Modalidad',
  hito: 'Hito',
}

export const TIPOS_NOTIFICACION = {
  info: 'Información',
  alerta: 'Alerta',
  urgente: 'Urgente',
  exito: 'Éxito',
}

export const NAV_POR_ROL = {
  director: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Proyectos', path: '/proyectos', icon: 'FolderOpen' },
    { label: 'Tribunales', path: '/tribunales', icon: 'Users' },
    { label: 'Calendario', path: '/calendario', icon: 'Calendar' },
    { label: 'Reportes', path: '/reportes', icon: 'BarChart2' },
    { label: 'Notificaciones', path: '/notificaciones', icon: 'Bell' },
  ],
  secretaria: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Proyectos', path: '/proyectos', icon: 'FolderOpen' },
    { label: 'Tribunales', path: '/tribunales', icon: 'Users' },
    { label: 'Calendario', path: '/calendario', icon: 'Calendar' },
    { label: 'Notificaciones', path: '/notificaciones', icon: 'Bell' },
  ],
  'tutor-interno': [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Proyectos', path: '/proyectos', icon: 'FolderOpen' },
    { label: 'Avances', path: '/avances', icon: 'ClipboardList' },
    { label: 'Notificaciones', path: '/notificaciones', icon: 'Bell' },
  ],
  'tutor-externo': [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Proyecto Asignado', path: '/proyectos', icon: 'FolderOpen' },
    { label: 'Avances', path: '/avances', icon: 'ClipboardList' },
    { label: 'Notificaciones', path: '/notificaciones', icon: 'Bell' },
  ],
  tribunal: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Defensas', path: '/tribunales', icon: 'Award' },
    { label: 'Firma de Actas', path: '/actas', icon: 'FileSignature' },
    { label: 'Notificaciones', path: '/notificaciones', icon: 'Bell' },
  ],
  estudiante: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Mi Proyecto', path: '/proyectos', icon: 'FolderOpen' },
    { label: 'Avances', path: '/avances', icon: 'ClipboardList' },
    { label: 'Seguimiento', path: '/seguimiento', icon: 'Activity' },
    { label: 'Notificaciones', path: '/notificaciones', icon: 'Bell' },
  ],
  administrador: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Usuarios', path: '/usuarios', icon: 'UserCog' },
    { label: 'Configuración', path: '/configuracion', icon: 'Settings' },
    { label: 'Notificaciones', path: '/notificaciones', icon: 'Bell' },
  ],
}

export const NOTA_MINIMA_DOCUMENTO = 26
export const NOTA_MINIMA_FINAL = 51
export const NOTA_MAXIMA = 100
export const NOTA_DOCUMENTO_MAX = 50
export const NOTA_DEFENSA_MAX = 50
export const HORAS_VENTANA_FIRMA = 1
export const HORAS_EDICION_AVANCE = 24
export const DIAS_ASIGNACION_TRIBUNAL = 3
export const DIAS_REVISION_PERFIL = 15
export const DIAS_CORRECCION = 60
export const DIAS_PRORROGA_MAX = 30
