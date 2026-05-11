# Rol: Estudiante

> **Código del rol:** `estudiante`
> **Cantidad por carrera:** Múltiples (todos los postulantes a graduación)
> **Mock asociado:** `/src/mocks/estudiante.json`

---

## 1. Identidad

El Estudiante es el **postulante a graduación**, eje central del proceso. Es quien **inicia el flujo** registrando su propuesta y avanza por los 3 hitos hasta obtener su título académico.

Solo tiene acceso a **su propio proyecto**: no puede ver información de otros estudiantes ni datos sensibles de la carrera.

---

## 2. Responsabilidades principales

- **Registrar su propuesta** de trabajo de graduación (modalidad, tema, documentos).
- **Subir documentos requeridos** según su vía de acceso (A, B o C).
- **Entregar avances periódicos** de su trabajo durante Grado II.
- **Atender observaciones** del tutor y del tribunal en los plazos establecidos.
- **Comentar y dar seguimiento** a su proyecto en el timeline.
- **Asistir a las defensas** privada y pública en las fechas programadas.

---

## 3. Permisos por módulo

| Módulo | Permiso |
|--------|--------|
| Usuarios | Sin acceso |
| Configuración | Sin acceso |
| Proyectos | Ver y editar **solo su propio proyecto** |
| Avance | Crear avances / Editar dentro de 24h de creación |
| Seguimiento | Comentar en timeline |
| Tribunales | Sin acceso |
| Calendario | Solo lectura (sus fechas clave) |
| Notificaciones | Recibir notificaciones de su proyecto |
| Reportes | Sin acceso |

---

## 4. Pantallas accesibles

- `/dashboard` — Vista de su proyecto con porcentaje de avance y próximas fechas
- `/proyectos/nuevo` — Registro de propuesta (formulario dinámico según modalidad)
- `/proyectos/:id` — Detalle de su proyecto
- `/proyectos/:id/avance` — Crear y subir avances
- `/seguimiento/:id` — Timeline de su proyecto con capacidad de comentar
- `/calendario` — Vista de sus fechas clave (perfil, defensa privada, defensa pública)
- `/notificaciones` — Panel de notificaciones

---

## 5. Acciones clave en el sistema

1. **Registrar nueva propuesta** seleccionando modalidad y completando formulario dinámico.
2. **Subir documentos requeridos**
3. **Crear avance**: título, descripción, porcentaje (0-100), archivos adjuntos.
4. **Editar avance** (solo dentro de 24 h desde creación).
5. **Solicitar prórroga única** de calendario
6. **Solicitar cambio de modalidad** con justificación (sujeto a aprobación del Director).
7. **Comentar en el timeline** del proyecto.

---

## 6. Restricciones

- ❌ No puede ver proyectos de otros estudiantes.
- ❌ No puede editar un avance después de 24 horas de creado.
- ❌ No puede modificar el estado del proyecto manualmente (cambia automáticamente según el flujo).
- ❌ No puede seleccionar su tribunal (lo designa el Director).
- ❌ No puede aprobar sus propios avances.
- ✅ Solo puede solicitar **una prórroga** de 30 días calendario por proyecto.

---

## 7. Datos del estudiante en el sistema

- Nombre completo (apellidos en mayúsculas para actas)
- CI / Documento de identidad
- CU (Carnet Universitario)
- Email
- Teléfono
- Carrera
- Estado académico (regular, egresado, con arrastres)
- Nota de Seminario de Grado II (determina vía de acceso)
- Promedio general (para verificar Excelencia)

---

## 8. Notificaciones que recibe

- Confirmación de propuesta registrada.
- Observaciones en presentación de avances.
- Validación de documentos por Secretaría.
- Asignación de tribunal.
- Observaciones del tribunal pendientes de subsanar.
- Recordatorios de plazos próximos a vencer.
- Fecha confirmada de defensa privada y pública.
- Resultado de cada hito (Acta firmada).
- Vencimientos críticos (vigencia del tema, plazos de corrección).
