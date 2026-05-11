# Rol: Secretaria / Coordinador

> **Código del rol:** `secretaria`
> **Cantidad por carrera:** Una sola persona (rol unificado Secretaria + Coordinador)
> **Mock asociado:** `/src/mocks/secretaria.json`

---

## 1. Identidad

La Secretaria es el **operador principal del sistema** y el punto de contacto inicial del estudiante en el proceso administrativo. Es responsable de **registrar, validar y dar seguimiento operativo** a todos los proyectos de la carrera.

Es el rol con **mayor carga transaccional** del sistema: revisa documentos, agenda fechas, genera reportes y asegura que cada proyecto avance según los plazos.

---

## 2. Responsabilidades principales

- **Registro y validación inicial de propuestas** entregadas por estudiantes.
- **Verificación documental**.
- **Asignación inicial de tutores internos** (con aprobación del Director).
- **Gestión de fechas** de defensa privada y defensa pública.
- **Programación de eventos** en el calendario académico.
- **Generación de reportes parciales** del estado de los proyectos.
- **Coordinación con Unidad de Investigación** para certificados de no-duplicidad.

---

## 3. Permisos por módulo

| Módulo | Permiso |
|--------|--------|
| Usuarios | Sin acceso |
| Configuración | Solo lectura |
| Proyectos | Registrar / Validar / Editar |
| Avance | Ver avances de todos los proyectos |
| Seguimiento | Registrar eventos / Ver timeline |
| Tribunales | Gestionar (crear, editar, programar fechas) |
| Calendario | CRUD completo |
| Notificaciones | Recibir notificaciones operativas |
| Reportes | Reportes parciales (sin métricas gerenciales sensibles) |

---

## 4. Pantallas accesibles

- `/dashboard` — Vista operativa con tareas pendientes
- `/proyectos` — Listado completo con filtros
- `/proyectos/nuevo` — Registro manual de propuesta (cuando el estudiante no usa el sistema directamente)
- `/proyectos/:id` — Detalle con acciones operativas
- `/seguimiento/:id` — Timeline con capacidad de registrar eventos
- `/tribunales` — Gestión completa
- `/calendario` — Gestión completa
- `/notificaciones` — Panel de notificaciones
- `/reportes` — Reportes parciales con exportación

---

## 5. Acciones clave en el sistema

1. **Validar documentos** entregados por el estudiante según su vía (A, B o C).
2. **Registrar propuesta** en nombre del estudiante si así lo requiere.
3. **Programar fecha de defensa** privada o pública (con aprobación del Director).
4. **Notificar al tribunal** las fechas y horarios de defensa.
5. **Generar y exportar reporte** mensual de proyectos por estado.
6. **Cargar nota de Grado II** desde eDocente para determinar la vía de acceso.

---

## 6. Restricciones

- ❌ No puede aprobar/rechazar proyectos (es facultad del Director).
- ❌ No puede designar tribunales (es facultad del Director).
- ❌ No tiene acceso a gestión de usuarios.
- ✅ Su validación inicial es requisito para que el Director pueda aprobar.

---

## 7. Notificaciones que recibe

- Nuevas propuestas registradas por estudiantes.
- Documentos pendientes de validación.
- Vencimientos próximos de plazos (correcciones, prórrogas).
- Confirmación de tribunal designado.
- Solicitudes de programación de defensa.
- Recordatorios de actas pendientes.
