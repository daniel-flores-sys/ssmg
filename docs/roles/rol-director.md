# Rol: Director de Carrera

> **Código del rol:** `director`
> **Cantidad por carrera:** Una sola persona
> **Mock asociado:** `/src/mocks/director.json`

---

## 1. Identidad

El Director de Carrera es la **máxima autoridad académica** dentro del flujo de graduación. Su función principal es **aprobar, designar y validar** decisiones críticas del proceso. No interviene en el día a día operativo, pero su firma es indispensable en los hitos importantes.

En el SSMG, el Director también actúa como **Presidente del Tribunal** en todas las defensas (Hito 1, 2 y 3).

---

## 2. Responsabilidades principales

- **Aprobaciones finales** de propuestas, cambios de modalidad y solicitudes excepcionales.
- **Designación de tribunales** (máximo 3 días hábiles desde recepción de requisitos — Art. 59).
- **Validación y firma de actas** como Presidente del Tribunal.
- **Autorización de cambios de modalidad** con justificación obligatoria.
- **Revisión de reportes gerenciales** del estado de la carrera.
- **Aprobación de prórrogas excepcionales** solicitadas por estudiantes (Art. 68).

---

## 3. Permisos por módulo

| Módulo | Permiso |
|--------|--------|
| Usuarios | Ver listado |
| Configuración | Ver parámetros |
| Proyectos | Aprobar / Rechazar / Cambiar modalidad |
| Avance | Ver avances de todos los proyectos |
| Seguimiento | Ver timeline completo |
| Tribunales | Designar tribunales / Firmar actas como Presidente |
| Calendario | CRUD completo |
| Notificaciones | Recibir notificaciones de su rol |
| Reportes | Acceso completo a todos los reportes |

---

## 4. Pantallas accesibles

- `/dashboard` — Vista gerencial con métricas clave de la carrera
- `/usuarios` — Solo lectura
- `/configuracion` — Solo lectura
- `/proyectos` — Listado con filtros (todos los proyectos de la carrera)
- `/proyectos/:id` — Detalle con acciones de aprobación
- `/seguimiento/:id` — Timeline completo
- `/tribunales` — Gestión de tribunales
- `/tribunales/:id/acta` — Firma de actas (responsive móvil)
- `/calendario` — Vista y gestión completa
- `/notificaciones` — Panel de notificaciones
- `/reportes` — Dashboard completo + exportación PDF/Excel

---

## 5. Acciones clave en el sistema

1. **Designar tribunal** para un proyecto con perfil aprobado.
2. **Aprobar / rechazar** cambio de modalidad solicitado por un estudiante.
3. **Firmar acta** como Presidente (siempre firma primero — orden estricto).
4. **Generar reporte gerencial** por modalidad, período o tutor.
5. **Aprobar prórroga única** de 30 días calendario.

---

## 6. Restricciones

- ❌ No puede ser miembro del tribunal en proyectos donde es tutor (no aplica — el Director no tutoriza proyectos).
- ✅ **Siempre** preside el tribunal cuando participa.
- ⏱ Tiene un plazo de **3 días hábiles** para designar tribunal una vez recibidos los requisitos.

---

## 7. Notificaciones que recibe

- Nuevas propuestas pendientes de aprobación.
- Solicitudes de cambio de modalidad.
- Solicitudes de prórroga.
- Actas pendientes de firma como Presidente.
- Reportes mensuales automáticos del estado de la carrera.
