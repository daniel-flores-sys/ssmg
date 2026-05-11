# Modelo de Datos — SSMG
## Sistema de Seguimiento de Modalidades de Graduación

> Todas las entidades usan **UUID v4** como ID.
> Todas las fechas en formato **ISO 8601** (`YYYY-MM-DDTHH:mm:ssZ`).
> Los JSON mock van en `/src/mocks/` — uno por rol.

---

## 1. ENTIDADES PRINCIPALES

### 1.1 Usuario

```typescript
Usuario {
  id: string                  // UUID
  nombre: string
  apellidos: string
  ci: string                  // Cédula de identidad
  email: string
  telefono: string
  rol: 'director' | 'secretaria' | 'tutor-interno' | 'tutor-externo' | 'tribunal' | 'estudiante' | 'administrador'
  carreraId: string           // UUID → Carrera
  activo: boolean
  creadoEn: string            // ISO 8601
}
```

**Campos adicionales por rol:**

```typescript
// Solo rol: estudiante
EstudianteDatos {
  codigoUniversitario: string
  estadoAcademico: 'regular' | 'egresado' | 'con-arrastres'
  notaSeminarioGrado: number | null   // 0-100, null si no cursó
  promedioGeneral: number | null
}

// Solo rol: tutor-externo
TutorExternoDatos {
  cargo: string
  institucionId: string       // UUID → Institucion
  cvUrl: string | null        // URL o path del archivo
  contratoUrl: string | null
}

// Solo rol: tutor-interno / tribunal
DocenteDatos {
  titulo: string              // Ej: "Ing.", "MSc.", "Dr."
  especialidad: string
  condicion: 'ordinario' | 'contrato-continuidad' | 'contrato-plazo-fijo' | 'suplente'
  antiguedad: number          // años
}
```

---

### 1.2 Carrera

```typescript
Carrera {
  id: string
  nombre: string
  facultad: string
  universidad: string
  regimen: 'semestral' | 'anual'
  modalidadesHabilitadas: ModalidadCodigo[]
  parametros: ParametrosCarrera
  activa: boolean
}

ParametrosCarrera {
  notaMinimaDocumento: number         // defecto: 26 (sobre 50)
  notaMinimaAprobacion: number        // defecto: 51 (sobre 100)
  diasHabilesAsignacionTribunal: number  // defecto: 3
  diasHabilesRevisionTribunal: number    // defecto: 15
  diasHabilesCorreccion: number          // defecto: 60
  diasCalendarioPrrroga: number          // defecto: 30
  minutosDefensaMaxima: number           // defecto: 60
  minutosExtensionDefensa: number        // defecto: 30
  minutosVentanaFirma: number            // defecto: 60
  vigenciaTemaTresAnios: boolean         // defecto: true
  vigenciaTemaGestiones: number          // defecto: 2
  miembrosTribunal: number               // defecto: 3
  minutosEsperaMaximaActo: number        // defecto: 20
}
```

---

### 1.3 Modalidad

```typescript
ModalidadCodigo = 'MOD-TES' | 'MOD-PRG' | 'MOD-TRD' | 'MOD-INT' | 'MOD-EXG'

Modalidad {
  id: string
  codigo: ModalidadCodigo
  nombre: string
  requiereTutorInterno: boolean
  requiereTutorExterno: boolean
  requiereDocumentoEscrito: boolean
  requiereDefensa: boolean
  documentosRequeridos: string[]     // lista de nombres de documentos
  rubricaDocumento: RubricaItem[]    // criterios de evaluación (50 pts total)
  rubricaDefensa: RubricaItem[]      // criterios de defensa oral (50 pts total)
}

RubricaItem {
  id: string
  descripcion: string
  puntajeMaximo: number
}
```

---

### 1.4 Proyecto

```typescript
Proyecto {
  id: string
  titulo: string
  modalidadCodigo: ModalidadCodigo
  carreraId: string
  estudianteId: string
  tutorInternoId: string | null
  tutorExternoId: string | null
  estado: EstadoProyecto
  periodoGrado: 'grado-1' | 'grado-2'
  porcentajeAvance: number           // 0-100
  documentos: DocumentoAdjunto[]
  historialEstados: CambioEstado[]
  historialModalidades: CambioModalidad[]
  fechaInicio: string                // ISO 8601
  fechaAprobacionPerfil: string | null
  fechaVencimientoTema: string | null
  creadoEn: string
  actualizadoEn: string
}

EstadoProyecto =
  | 'borrador'
  | 'en-revision'
  | 'perfil-aprobado'
  | 'tribunal-asignado'
  | 'con-observaciones'
  | 'defensa-privada-programada'
  | 'defensa-privada-aprobada'
  | 'defensa-publica-programada'
  | 'aprobado'
  | 'reprobado'
  | 'rechazado'
  | 'graduado'

CambioEstado {
  id: string
  estadoAnterior: EstadoProyecto
  estadoNuevo: EstadoProyecto
  motivo: string | null
  realizadoPor: string               // userId
  fecha: string
}

CambioModalidad {
  id: string
  modalidadAnterior: ModalidadCodigo
  modalidadNueva: ModalidadCodigo
  motivo: string
  aprobadoPor: string                // userId del Director
  fecha: string
}

DocumentoAdjunto {
  id: string
  nombre: string
  tipo: string                       // Ej: "Certificado de Notas", "Perfil Anillado"
  url: string
  subidoEn: string
  subidoPor: string                  // userId
}
```

---

### 1.5 Avance

```typescript
Avance {
  id: string
  proyectoId: string
  titulo: string
  descripcion: string
  porcentaje: number                 // 0-100
  capitulo: string | null            // Ej: "Capítulo 2 - Marco Contextual"
  adjuntos: DocumentoAdjunto[]
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  observaciones: string | null       // Observaciones del tutor
  revisadoPor: string | null         // userId del tutor
  creadoEn: string
  editableHasta: string              // creadoEn + 24h (calculado)
  revisadoEn: string | null
}
```

---

### 1.6 Tribunal

```typescript
Tribunal {
  id: string
  proyectoId: string
  miembros: MiembroTribunal[]
  creadoEn: string
  designadoPor: string               // userId del Director
}

MiembroTribunal {
  id: string
  usuarioId: string
  cargo: 'presidente' | 'vocal-1' | 'vocal-2'
  ordenFirma: 1 | 2 | 3             // Presidente=1, Vocal1=2, Vocal2=3
}
```

---

### 1.7 Defensa

```typescript
Defensa {
  id: string
  proyectoId: string
  tribunalId: string
  tipo: 'perfil' | 'privada' | 'publica'
  fecha: string                      // ISO 8601
  horaInicio: string                 // "HH:mm"
  lugar: string
  enlaceVirtual: string | null
  estado: 'programada' | 'en-curso' | 'finalizada' | 'suspendida' | 'reprogramada'
  actaId: string | null
}
```

---

### 1.8 Acta

```typescript
Acta {
  id: string
  defensaId: string
  proyectoId: string
  tipo: 'perfil' | 'privada' | 'publica'
  estado: 'pendiente' | 'en-firma' | 'firmada' | 'vencida'
  resultado: 'aprobado' | 'aprobado-con-observaciones' | 'reprobado' | null
  notaDocumento: number | null        // 0-50
  notaDefensa: number | null          // 0-50
  notaFinal: number | null            // 0-100
  notaLiteral: string | null          // Ej: "Setenta y ocho"
  observaciones: string | null
  ventanaFirmaInicio: string | null    // ISO 8601
  ventanaFirmaFin: string | null       // ISO 8601 (inicio + minutosVentanaFirma)
  firmas: FirmaActa[]
  contenidoTexto: string              // Texto del acta auto-generado
  creadoEn: string
}

FirmaActa {
  id: string
  usuarioId: string
  cargo: 'presidente' | 'vocal-1' | 'vocal-2'
  ordenFirma: 1 | 2 | 3
  firmado: boolean
  timestamp: string | null            // ISO 8601 — momento exacto de la firma
  confirmacionLegal: boolean          // checkbox aceptado
}
```

---

### 1.9 Evento de Seguimiento (Timeline)

```typescript
EventoSeguimiento {
  id: string
  proyectoId: string
  tipo: 'revision' | 'informe-institucional' | 'comentario' | 'cambio-estado' | 'cambio-modalidad' | 'hito'
  titulo: string
  contenido: string
  autorId: string
  autorRol: string
  adjuntos: DocumentoAdjunto[]
  creadoEn: string
}
```

---

### 1.10 Notificación

```typescript
Notificacion {
  id: string
  usuarioId: string
  titulo: string
  mensaje: string
  tipo: 'info' | 'alerta' | 'urgente' | 'exito'
  leida: boolean
  accionUrl: string | null           // Ruta a la que dirige al hacer clic
  creadoEn: string
}
```

---

### 1.11 Evento de Calendario

```typescript
EventoCalendario {
  id: string
  proyectoId: string | null           // null = evento general de carrera
  titulo: string
  descripcion: string | null
  fecha: string                       // ISO 8601
  tipo: 'defensa' | 'entrega' | 'vencimiento' | 'general'
  semaforo: 'verde' | 'amarillo' | 'rojo'  // calculado en runtime según fecha
  creadoPor: string                   // userId
}
```

---

### 1.12 Institución

```typescript
Institucion {
  id: string
  nombre: string
  tipo: string                        // Ej: "Municipio", "Ministerio", "Empresa"
  convenioActivo: boolean
  convenioUrl: string | null
  contactoNombre: string | null
  contactoEmail: string | null
}
```

---

## 2. RELACIONES ENTRE ENTIDADES

```
Carrera         1 ──── N   Proyecto
Carrera         1 ──── N   Usuario
Proyecto        1 ──── 1   Tribunal
Proyecto        1 ──── N   Avance
Proyecto        1 ──── N   EventoSeguimiento
Proyecto        1 ──── N   Defensa
Proyecto        1 ──── N   EventoCalendario
Defensa         1 ──── 1   Acta
Tribunal        1 ──── N   MiembroTribunal
Usuario         N ──── N   Proyecto          (como tutor-interno / tutor-externo)
Institucion     1 ──── N   TutorExternoDatos
```

---

## 3. CONSTANTES DEL SISTEMA

```typescript
// src/utils/constants.ts

export const ESTADOS_PROYECTO = {
  BORRADOR: 'borrador',
  EN_REVISION: 'en-revision',
  PERFIL_APROBADO: 'perfil-aprobado',
  TRIBUNAL_ASIGNADO: 'tribunal-asignado',
  CON_OBSERVACIONES: 'con-observaciones',
  DEFENSA_PRIVADA_PROGRAMADA: 'defensa-privada-programada',
  DEFENSA_PRIVADA_APROBADA: 'defensa-privada-aprobada',
  DEFENSA_PUBLICA_PROGRAMADA: 'defensa-publica-programada',
  APROBADO: 'aprobado',
  REPROBADO: 'reprobado',
  RECHAZADO: 'rechazado',
  GRADUADO: 'graduado',
}

export const MODALIDADES = {
  TESIS: 'MOD-TES',
  PROYECTO_GRADO: 'MOD-PRG',
  TRABAJO_DIRIGIDO: 'MOD-TRD',
  INTERNADO: 'MOD-INT',
  EXAMEN_GRADO: 'MOD-EXG',
}

export const ROLES = {
  DIRECTOR: 'director',
  SECRETARIA: 'secretaria',
  TUTOR_INTERNO: 'tutor-interno',
  TUTOR_EXTERNO: 'tutor-externo',
  TRIBUNAL: 'tribunal',
  ESTUDIANTE: 'estudiante',
  ADMINISTRADOR: 'administrador',
}

export const TIPOS_ACTA = {
  PERFIL: 'perfil',
  PRIVADA: 'privada',
  PUBLICA: 'publica',
}

export const ESTADOS_ACTA = {
  PENDIENTE: 'pendiente',
  EN_FIRMA: 'en-firma',
  FIRMADA: 'firmada',
  VENCIDA: 'vencida',
}

export const TIPOS_EVENTO = {
  REVISION: 'revision',
  INFORME_INSTITUCIONAL: 'informe-institucional',
  COMENTARIO: 'comentario',
  CAMBIO_ESTADO: 'cambio-estado',
  CAMBIO_MODALIDAD: 'cambio-modalidad',
  HITO: 'hito',
}

export const SEMAFORO = {
  VERDE: 'verde',       // más de 5 días hábiles
  AMARILLO: 'amarillo', // 5 días hábiles o menos
  ROJO: 'rojo',         // vencido
}
```

---

## 4. ESTRUCTURA DE LOS JSON MOCK

Cada JSON de rol contiene:

```typescript
MockRol {
  usuarioActivo: Usuario & (EstudianteDatos | DocenteDatos | TutorExternoDatos)
  proyectos: Proyecto[]            // solo los relevantes para el rol
  avances: Avance[]
  tribunales: Tribunal[]
  defensas: Defensa[]
  actas: Acta[]
  eventosSeguimiento: EventoSeguimiento[]
  notificaciones: Notificacion[]
  eventosCalendario: EventoCalendario[]
  // Datos de referencia
  usuarios: Usuario[]              // usuarios con los que interactúa el rol
  carreras: Carrera[]
  modalidades: Modalidad[]
  instituciones: Institucion[]
}
```

> Los datos mock no representan una base de datos completa.
> Cada JSON contiene **solo lo que ese rol necesita ver en pantalla**.
> Los IDs se cruzan entre archivos para simular relaciones reales.

---

## 5. LÓGICA DE NEGOCIO EN EL FRONTEND (sin backend)

Estas reglas se implementan en hooks o utils del frontend:

| Regla | Dónde implementar |
|-------|------------------|
| `editableHasta = creadoEn + 24h` | `useAvance.ts` |
| `semaforo` según días restantes | `dateHelpers.ts` |
| `ventanaFirmaFin = ventanaFirmaInicio + 60 min` | `useActa.ts` |
| Orden de firma (no puede firmar si el anterior no firmó) | `useActa.ts` |
| Bloqueo de firma después de firmar | `useActa.ts` |
| `notaFinal = notaDocumento + notaDefensa` | `useDefensa.ts` |
| `porcentajeAvance` = promedio de avances aprobados | `useProyecto.ts` |
| Estado del proyecto avanza solo si requisitos completos | `useProyecto.ts` |
