# Rol: Docente / Tutor Interno

> **Código del rol:** `tutor-interno`
> **Cantidad por carrera:** Múltiples (un docente puede tutorizar varios proyectos simultáneamente)
> **Mock asociado:** `/src/mocks/tutor-interno.json`

---

## 1. Identidad

El Tutor Interno es un **docente de la carrera** asignado oficialmente para guiar al estudiante en el desarrollo de su proyecto. Es el responsable académico directo del avance del trabajo.

Un docente puede ser **tutor en más de una carrera** simultáneamente. También puede ser **miembro del tribunal en otros proyectos** distintos a los que tutoriza, pero nunca en el mismo proyecto donde es tutor.

---

## 2. Responsabilidades principales

- **Revisión de avances** entregados por el estudiante.
- **Registro de tutorías** y reuniones realizadas.
- **Emisión de observaciones** y recomendaciones técnicas.
- **Aprobación de borradores** parciales por capítulo.
- **Aprobación final del documento** antes de entrega al tribunal.
- **Acompañamiento académico** durante todo el período de Grado I y Grado II.

---

## 3. Permisos por módulo

| Módulo | Permiso |
|--------|--------|
| Usuarios | Sin acceso |
| Configuración | Sin acceso |
| Proyectos | Ver solo proyectos asignados |
| Avance | Revisar / Aprobar / Rechazar avances |
| Seguimiento | Registrar eventos en timeline |
| Tribunales | Sin acceso (excepto si es tribunal en otro proyecto) |
| Calendario | Solo lectura |
| Notificaciones | Recibir notificaciones de sus proyectos |
| Reportes | Sin acceso |

---

## 4. Pantallas accesibles

- `/dashboard` — Vista con sus proyectos asignados y avances pendientes de revisión
- `/proyectos` — Listado filtrado a sus proyectos asignados
- `/proyectos/:id` — Detalle del proyecto asignado
- `/proyectos/:id/avance` — Revisar avances entregados
- `/seguimiento/:id` — Timeline del proyecto (con capacidad de registrar eventos)
- `/calendario` — Vista de fechas clave (solo lectura)
- `/notificaciones` — Panel de notificaciones

---

## 5. Acciones clave en el sistema

1. **Revisar avance** entregado por el estudiante: aprobar o rechazar con observaciones.
2. **Registrar evento de revisión** en el timeline del proyecto.
3. **Aprobar el documento final** antes de la entrega al tribunal.
4. **Solicitar reunión de tutoría** y registrarla en el sistema.

---

## 6. Restricciones

- ❌ **No puede ser miembro del tribunal del mismo proyecto** que tutoriza.
- ❌ No puede acceder a proyectos donde no está asignado.
- ❌ No puede modificar el estado del proyecto (solo revisa avances).
- ❌ No puede generar reportes ni acceder a configuración.
- ✅ Sí puede ser tribunal en otros proyectos donde no ejerce tutoría.
- ✅ Sí puede tutorizar proyectos en más de una carrera.

---

## 7. Notificaciones que recibe

- Nuevo avance entregado para revisión de un estudiante en particular.
- Comentarios del estudiante en el timeline.
- Recordatorios de plazos próximos.
- Asignación de un nuevo proyecto a tutorizar.
- Confirmación de aprobación del perfil por el tribunal (Hito 1 completado).
