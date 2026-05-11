# Proyecto: Sistema de Seguimiento de Modalidades de Graduación (SSMG)

---

## 1. Introducción

### 1.1 Objetivo General

Desarrollar un sistema web integral que permita el registro, seguimiento, control, aprobación y generación de reportes de todas las modalidades de graduación de la carrera, gestionando de forma eficiente temas, tutores (internos y externos), tribunales, defensas, actas, documentos y cambios de modalidad.

El sistema contará con integración a Google Calendar, sincronización con eDocente, firma digital de actas y cumplimiento de la Ley de Protección de Datos Personales vigente en Bolivia.

### 1.2 Objetivos Específicos

- Automatizar el flujo completo de las modalidades de graduación.
- Reducir tiempos administrativos y errores manuales.
- Proporcionar visibilidad en tiempo real del avance de los estudiantes.
- Generar reportes gerenciales confiables.
- Mejorar la experiencia de estudiantes, docentes y personal administrativo.

---

## 2. Roles y Permisos

| **Rol** | **Permisos Principales** |
|---|---|
| Director de Carrera | Aprobaciones finales, designación de tribunales, cambios de modalidad, reportes gerenciales, validación de actas |
| Secretaria / Coordinador | Registro y validación de temas, asignación inicial de tutores, gestión de fechas, generación de reportes |
| Docente / Tutor Interno | Revisión de avances, registro de tutorías, observaciones, aprobación de borradores |
| Tutor Externo | Acceso a proyectos asignados, registro de seguimientos y revisiones |
| Tribunal | Acceso a trabajos asignados, registro de calificaciones, firma digital de actas |
| Estudiante | Registro de propuesta, subida de documentos, seguimiento de su proceso, visualización de observaciones y fechas |
| Administrador | Gestión de usuarios, parámetros del sistema, auditoría, backups |

---

## 3. Módulos del Sistema

### 3.1 Módulo de Administración de Usuarios

- Gestión completa de usuarios y roles (RBAC).
- Agregar, listar, actualizar y ver detalle de tutores internos y externos.
- Agregar, listar y ver detalle de estudiantes.
- Tutores externos incluyen: institución de procedencia, CV, contrato, etc.

### 3.2 Módulo de Configuración

- Gestión de Instituciones (para tutores externos).
- Gestión de Modalidades de Graduación (con reglas, plazos, documentos requeridos y porcentaje mínimo de avance).
- Parámetros por carrera (plazos, cantidad de miembros de tribunal, etc.).

### 3.3 Módulo de Proyectos / Propuestas

- Registro de propuesta con formulario **dinámico** según la modalidad seleccionada.
- Asignación de tutor (tabla `AsignacionesTutor`).
- Gestión completa de documentos por etapa/modalidad.
- Actualización de información, fechas de inicio y finalización, cambio de estado.
- Listados: todos los proyectos, por estudiante, por tutor, por estado y avance.
- Historial de cambios de modalidad y tribunales.

### 3.4 Módulo de Avance de Proyecto

- Creación de avances por el estudiante (título, descripción, porcentaje, archivos).
- Listado y detalle de avances con sus documentos adjuntos.
- Edición y eliminación con ventana de tiempo limitada y restricciones por rol.

### 3.5 Módulo de Seguimiento de Avance

- Registro de seguimientos/revisiones por: Tutor (interno/externo), Administrador, Coordinador y comentarios del estudiante.
- Tipos de seguimiento: Revisión, Informe Institucional, Comentario.
- Visualización en timeline completo del proyecto.

### 3.6 Módulo de Tribunales y Defensas

- Creación y gestión de tribunales (3–5 miembros + suplentes).
- Designación automática o manual.
- Registro de defensas privada y pública (fecha, hora, lugar, enlace virtual).
- Digitalización y firma digital de actas:
  - Acta de Perfil
  - Acta de Defensa Privada
  - Acta de Defensa Pública

### 3.7 Módulo de Fechas y Calendario

- Control de fechas clave por etapa.
- Integración con Google Calendar (creación automática de eventos y recordatorios).
- Notificaciones automáticas (in-app + correo).

### 3.8 Módulo de Notificaciones y Tareas Automatizadas

- Notificaciones en tiempo real (acciones importantes).
- Envío de correos electrónicos (SMTP).
- Tareas programadas (recordatorios, cambio automático de modalidad, etc.).

### 3.9 Módulo de Reportes y Dashboard

- Dashboard con métricas clave (estudiantes por etapa, % de avance general, defensas próximas, etc.).
- Reportes por estudiante, tutor, carrera, modalidad y período.
- Exportación a Excel y PDF.

---

## 4. Requisitos No Funcionales

### 4.1 Rendimiento (Performance)

| **Requisito** | **Descripción** | **Métrica Objetivo** |
|---|---|---|
| Tiempo de respuesta | Tiempo máximo de carga de páginas y respuestas de API | ≤ 2 segundos (≤ 1 segundo para consultas simples) |
| Tiempo de generación de reportes | Reportes complejos (más de 500 registros) | ≤ 8 segundos |
| Concurrencia | Usuarios simultáneos soportados | Mínimo 150 usuarios concurrentes |
| Subida de documentos | Tiempo máximo para subir archivos de hasta 25 MB | ≤ 5 segundos |
| Búsquedas | Tiempo de respuesta en listados con filtros | ≤ 3 segundos |

### 4.2 Escalabilidad y Capacidad

- El sistema debe soportar hasta 1.500 estudiantes activos y 200 docentes/tutores simultáneamente.
- Diseñado para escalar horizontalmente (posibilidad de añadir servidores de aplicación).
- Soporte multi-carrera y multi-sede sin degradación de rendimiento.

### 4.3 Disponibilidad y Confiabilidad

- Disponibilidad: 99% en horario laboral (lunes a viernes, 07:00 - 20:00).
- Tiempo de recuperación (RTO): Máximo 4 horas en caso de fallo.
- Punto de recuperación (RPO): Máximo 1 hora de pérdida de datos.
- Backups automáticos diarios (completo) y diferenciales cada 6 horas.
- Sistema de monitoreo de caídas (logs + alertas por correo).

### 4.4 Seguridad

- Autenticación centralizada mediante Keycloak con JWT.
- Implementación de RBAC (Control de Acceso Basado en Roles).
- Todas las contraseñas cifradas (bcrypt o Argon2).
- Uso de HTTPS en todos los entornos.
- Protección contra ataques comunes (SQL Injection, XSS, CSRF) — Yii2 maneja por defecto la mayoría.
- Registro completo de auditoría de todas las acciones críticas (quién, qué, cuándo, desde qué IP).
- Bloqueo automático de cuentas tras 5 intentos fallidos.
- Cumplimiento de la Ley Nº 164 de Protección de Datos Personales de Bolivia.

### 4.5 Usabilidad

- Interfaz intuitiva y amigable, especialmente para secretarias y estudiantes.
- Diseño Responsive (computadoras, tablets y celulares).
- Cumplir con estándares WCAG 2.1 nivel AA (accesibilidad).
- Tiempo máximo de aprendizaje para usuarios finales: 2 horas de capacitación.
- Uso de lenguaje claro y guías contextuales (tooltips).

### 4.6 Mantenibilidad

- Código fuente documentado y estructurado (Yii2 Advanced Template).
- Uso de Migrations para control de cambios en base de datos.
- Separación clara entre capas (MVC).
- Pruebas unitarias y funcionales (mínimo 70% de cobertura en código crítico).
- Control de versiones (Git) con GitFlow.

### 4.7 Integraciones

- Integración bidireccional o sincronización con eDocente (matrículas y datos de estudiantes).
- Integración con Google Calendar mediante OAuth2 / Service Account.
- Posibilidad futura de integración con firma digital (Viafirma o similar).
- Soporte para envío de correos mediante SMTP con autenticación.

### 4.8 Gestión de Datos

- Base de datos: SQL Server.
- Uso de Soft Delete en todas las tablas principales (`deleted_at`).
- Tamaño máximo de archivos: 25 MB por documento.
- Almacenamiento de archivos en repositorio institucional (no solo en el servidor web).
- Política de retención de datos según ley boliviana.
- Soporte para formularios dinámicos mediante campos JSON.

### 4.9 Cumplimiento Legal y Normativo

- Cumplimiento total de la Ley de Protección de Datos Personales (Bolivia).
- Consentimiento explícito para el tratamiento de datos personales.
- Posibilidad de exportar y eliminar datos de un usuario (Derecho al Olvido).
- Registro de consentimiento en la base de datos.
- Cumplimiento de normativas internas de la universidad.

### 4.10 Requisitos Técnicos

| **Capa / Aspecto** | **Detalle** |
|---|---|
| Backend | Yii2 Framework (PHP 8.1 o superior) |
| Frontend | Bootstrap 5 + AdminLTE 3 |
| Servidor | Compatible con Windows Server / Linux |
| Navegadores soportados | Chrome, Edge, Firefox |
| Entorno de producción | Servidor propio o hosting dedicado |

### 4.11 Requisitos de Calidad

- Tasa de error en procesos críticos (defensas, actas, asignación de tribunales): **0%**.
- Satisfacción de usuarios ≥ 85% (medida mediante encuestas).
- Tiempo promedio de procesamiento de una propuesta: reducir en al menos **40%** respecto al proceso manual actual.

---

## 5. Diseño de Base de Datos (Entidades Principales)

### Tablas Principales

| **Tabla** | **Descripción** |
|---|---|
| `usuarios` | Usuarios del sistema |
| `universitarios` | Datos específicos de estudiantes universitarios |
| `tutores` | Tutores internos y externos |
| `instituciones` | Entidades de procedencia de tutores externos |
| `modalidades_cursos` | Modalidades de graduación disponibles |
| `propuestas` / `proyectos` | Propuestas y proyectos de graduación |
| `asignaciones_tutor` | Relación tutor–proyecto |
| `documentos_proyecto` | Documentos adjuntos por etapa/modalidad |
| `avances_proyecto` | Registros de avance reportados por el estudiante |
| `seguimientos_avance` | Revisiones y comentarios de tutores y coordinadores |
| `tribunales` | Tribunales conformados |
| `asignaciones_tribunal` | Relación miembro–tribunal |
| `defensas` | Registros de defensas privada y pública |
| `actas` | Actas generadas y firmadas digitalmente |
| `eventos_calendario` | Eventos sincronizados con Google Calendar |
| `notificaciones` | Notificaciones in-app y por correo |
| `auditoria` | Historial completo de cambios y acciones críticas |

### Recomendaciones de Diseño

- Uso de JSON para datos flexibles (formularios dinámicos).
- Campo `deleted_at` para Soft Delete en todas las tablas principales.
- Tabla de auditoría centralizada.
- Estados controlados por catálogo.

---

## 6. Tecnologías Recomendadas (Stack)

| **Capa** | **Tecnología** | **Justificación** |
|---|---|---|
| Backend | Yii2 Advanced Template (PHP) | Robustez, RBAC nativo, excelente para CRUD |
| Frontend | Bootstrap 5 + AdminLTE + Yii2 Views | Interfaz amigable e intuitiva |
| Base de Datos | SQL Server | Requerimiento institucional |
| Autenticación | Keycloak + JWT | Seguridad y centralización |
| Archivos | Flysystem + Repositorio Institucional | Escalabilidad |
| Notificaciones | SMTP + Notificaciones In-App | Comunicación efectiva |
| Calendario | Google API Client + OAuth2 / Service Account | Integración robusta |
| Reportes | PhpSpreadsheet (Excel) + mPDF / TCPDF | Mejor rendimiento |
| Firma Digital | TCPDF + certificados o integración Viafirma / DocuSign | Cumplimiento legal |

---

## 7. Flujo Principal del Sistema

1. Estudiante registra propuesta → Formulario dinámico.
2. Secretaria valida y asigna tutor (`AsignacionesTutor`).
3. Tutor y estudiante registran avances y seguimientos.
4. Director aprueba tribunal y fechas.
5. Sistema genera eventos en Google Calendar.
6. Se realizan defensas → registro de calificaciones y actas.
7. Aprobación final y generación de constancia.

### Lógicas Automáticas

- Cambio automático a "Programa de Antiguos Egresados" en segunda modalidad.
- Recordatorios 7, 3 y 1 día antes de fechas clave.

---

## 8. Fases de Desarrollo

### Fase 1 — (6–8 semanas)

- Autenticación y gestión de roles
- Administración de usuarios y configuración
- Registro de propuestas + asignación de tutor
- Avances y seguimientos básicos
- Notificaciones y reportes simples

### Fase 2 — (8–10 semanas)

- Gestión de tribunales y defensas
- Actas y firma digital
- Integración completa con Google Calendar
- Documentos dinámicos por modalidad
- Dashboard y reportes avanzados

### Fase 3 — Extensiones

- Sincronización profunda con eDocente
- Mejoras de usabilidad y analíticas

---

## 9. Consideraciones Adicionales

- Cumplimiento estricto de la Ley de Protección de Datos (Bolivia).
- Auditoría completa de todas las acciones críticas.
- Interfaz amigable e intuitiva (prioridad alta para secretarias y estudiantes).
- Soporte multi-carrera desde el diseño.
- Seguridad: validaciones, rate limiting, backups automáticos.

---

## 10. User Stories — SSMG

### 10.1 Módulo de Administración de Usuarios

| **ID** | **Rol** | **Historia de Usuario** | **Criterios de Aceptación** |
|---|---|---|---|
| US-101 | Administrador | Como Administrador quiero crear usuarios (estudiantes, docentes, tutores externos) para darles acceso al sistema | Validación de datos, asignación de rol y carrera, envío de credenciales por correo |
| US-102 | Administrador | Como Administrador quiero listar y buscar usuarios para gestionar fácilmente el registro | Filtros por rol, carrera, estado y búsqueda por nombre/matrícula |
| US-103 | Administrador | Como Administrador quiero ver detalle completo de un usuario para revisar su información | Mostrar datos personales, rol, historial de actividad |
| US-104 | Administrador / Tutor | Como Administrador / Tutor quiero agregar tutor externo para permitir la participación de profesionales externos | Incluir institución, CV, datos de contacto y contrato |
| US-105 | Tutor Externo | Como Tutor Externo quiero actualizar mis propios datos para mantener mi información actualizada | Solo campos permitidos (teléfono, correo, especialidad) |
| US-106 | Administrador | Como Administrador quiero gestionar roles y permisos (RBAC) para controlar el acceso | Asignación y modificación de roles |

### 10.2 Módulo de Configuración

| **ID** | **Rol** | **Historia de Usuario** | **Criterios de Aceptación** |
|---|---|---|---|
| US-201 | Administrador | Como Administrador quiero CRUD de Instituciones para registrar entidades de tutores externos | Crear, leer, actualizar y eliminar instituciones |
| US-202 | Administrador | Como Administrador quiero gestionar Modalidades de Graduación para definir reglas por modalidad | Incluir nombre, descripción, documentos requeridos, plazos y % mínimo de avance |
| US-203 | Administrador | Como Administrador quiero configurar parámetros por carrera para adaptar el sistema | Plazos por etapa, cantidad de tribunales, etc. |

### 10.3 Módulo de Proyectos / Propuestas

| **ID** | **Rol** | **Historia de Usuario** | **Criterios de Aceptación** |
|---|---|---|---|
| US-301 | Estudiante | Como Estudiante quiero registrar una nueva propuesta de proyecto para iniciar mi modalidad de graduación | Formulario dinámico según modalidad, título, resumen, palabras clave, documentos iniciales |
| US-302 | Secretaria / Administrador | Como Secretaria quiero validar y aprobar propuestas para revisar calidad y requisitos | Aprobación/rechazo con observaciones |
| US-303 | Administrador / Secretaria | Como Secretaria quiero asignar tutor a un proyecto para iniciar el acompañamiento | Uso de tabla AsignacionesTutor |
| US-304 | Administrador / Estudiante | Como Administrador / Estudiante quiero actualizar información del proyecto (fechas, estado, modalidad) | Control de permisos según rol |
| US-305 | Estudiante | Como Estudiante quiero subir documentos según la etapa y modalidad para cumplir requisitos | Perfil, avances, versión final, etc. |
| US-306 | Director | Como Director quiero aprobar cambio de modalidad para gestionar excepciones | Justificación obligatoria y registro en historial |
| US-307 | Todos | Como Usuario quiero listar proyectos (todos, por tutor, por estudiante, por estado) con filtros y búsqueda | Dashboard de proyectos |

### 10.4 Módulo de Avance de Proyecto

| **ID** | **Rol** | **Historia de Usuario** | **Criterios de Aceptación** |
|---|---|---|---|
| US-401 | Estudiante | Como Estudiante quiero crear un avance de proyecto para reportar progreso | Título, descripción, porcentaje de avance, subida de archivos |
| US-402 | Estudiante | Como Estudiante quiero ver el listado y detalle de mis avances para llevar control | Orden cronológico |
| US-403 | Estudiante | Como Estudiante quiero editar o eliminar un avance (dentro de un tiempo limitado) para corregir errores | Editable hasta 48 horas después de creación |

### 10.5 Módulo de Seguimiento de Avance

| **ID** | **Rol** | **Historia de Usuario** | **Criterios de Aceptación** |
|---|---|---|---|
| US-501 | Tutor / Tutor Externo | Como Tutor quiero crear seguimiento o revisión de un avance para dar retroalimentación | Comentario, observaciones, calificación de avance, archivos |
| US-502 | Administrador / Secretaria | Como Administrador quiero agregar comentario o informe al proyecto para dejar constancia institucional | Tipo: Revisión, Informe, Comentario |
| US-503 | Estudiante | Como Estudiante quiero ver el timeline completo de avances y seguimientos de mi proyecto | Vista cronológica clara |
| US-504 | Tutor | Como Tutor quiero editar o eliminar mis seguimientos (con restricciones de tiempo) | Control por rol y tiempo |

### 10.6 Módulo de Tribunales y Defensas

| **ID** | **Rol** | **Historia de Usuario** | **Criterios de Aceptación** |
|---|---|---|---|
| US-601 | Director | Como Director quiero crear y designar tribunales para las defensas | Designación manual o sugerida automáticamente |
| US-602 | Director | Como Director quiero asignar tribunal a un proyecto para formalizar la evaluación | Presidente y secretario definidos |
| US-603 | Tribunal | Como Miembro de Tribunal quiero registrar calificaciones de defensa privada y pública | Calificación y observaciones |
| US-604 | Secretaria / Tribunal | Como Secretaria quiero registrar defensas (privada y pública) para dejar constancia | Fecha, hora, lugar, enlace virtual |
| US-605 | Tribunal / Secretaria | Como Usuario autorizado quiero cargar actas firmadas digitalmente para validar el proceso | Acta de Perfil, Defensa Privada y Pública |

### 10.7 Módulo de Notificaciones y Calendario

| **ID** | **Rol** | **Historia de Usuario** | **Criterios de Aceptación** |
|---|---|---|---|
| US-701 | Todos | Como Usuario quiero recibir notificaciones del sistema para estar al tanto de acciones importantes | In-app y por correo |
| US-702 | Todos | Como Usuario quiero recibir recordatorios automáticos de fechas clave | 7, 3 y 1 día antes |
| US-703 | Sistema | Como Sistema quiero crear eventos automáticamente en Google Calendar para tutorías y defensas | Integración vía OAuth2 |

### 10.8 Módulo de Reportes y Dashboard

| **ID** | **Rol** | **Historia de Usuario** | **Criterios de Aceptación** |
|---|---|---|---|
| US-801 | Director / Administrador | Como Director quiero visualizar un Dashboard con métricas principales para tomar decisiones | % de avance general, estudiantes por etapa, defensas próximas |
| US-802 | Director / Secretaria | Como Director quiero generar reportes por estudiante, tutor, modalidad, carrera y período | Exportar a Excel y PDF |
| US-803 | Todos | Como Usuario quiero ver reportes de mis proyectos/tutorías para seguimiento personal | Reportes propios |
