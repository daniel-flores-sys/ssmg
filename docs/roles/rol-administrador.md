# Rol: Administrador

> **Código del rol:** `administrador`
> **Cantidad por sistema:** Mínimo uno (personal de TI)
> **Mock asociado:** `/src/mocks/administrador.json`

---

## 1. Identidad

El Administrador es el **rol técnico del sistema**, responsable de la **infraestructura y configuración general**. **No participa en flujos académicos**: no aprueba proyectos, no firma actas, no tutoriza estudiantes.

Es el rol con **mayor amplitud técnica** pero **menor poder académico**: puede gestionar datos del sistema pero no puede tomar decisiones académicas en nombre de otros roles.

Está completamente **separado** del rol Secretaria/Coordinador (que es operativo académico).

---

## 2. Responsabilidades principales

- **Gestión de usuarios:** crear, editar, desactivar usuarios de todos los roles.
- **Configuración del sistema:** parámetros generales, plazos, modalidades habilitadas por carrera.
- **Auditoría:** revisar logs de acciones realizadas en el sistema.
- **Backups:** gestionar respaldos periódicos de la información.
- **Soporte técnico:** resolver problemas de acceso o funcionamiento.
- **Configuración multi-carrera:** habilitar y configurar nuevas carreras o facultades.

---

## 3. Permisos por módulo

| Módulo | Permiso |
|--------|--------|
| Usuarios | CRUD completo de todos los roles |
| Configuración | CRUD completo de parámetros del sistema |
| Proyectos | Solo lectura (auditoría) |
| Avance | Solo lectura (auditoría) |
| Seguimiento | Solo lectura (auditoría) |
| Tribunales | Solo lectura (auditoría) |
| Calendario | CRUD completo |
| Notificaciones | Recibir notificaciones técnicas |
| Reportes | Acceso completo (incluye reportes de auditoría) |

---

## 4. Pantallas accesibles

- `/dashboard` — Vista técnica con métricas del sistema (usuarios activos, proyectos por carrera, etc.)
- `/usuarios` — Gestión completa de usuarios
- `/configuracion` — Gestión de parámetros, modalidades, instituciones, carreras
- `/proyectos` — Listado completo (solo lectura)
- `/proyectos/:id` — Detalle (solo lectura)
- `/seguimiento/:id` — Timeline (solo lectura)
- `/tribunales` — Listado (solo lectura)
- `/calendario` — Gestión completa
- `/notificaciones` — Panel de notificaciones técnicas
- `/reportes` — Reportes completos + auditoría

---

## 5. Acciones clave en el sistema

1. **Crear usuario** de cualquier rol (Director, Secretaria, Tutor, Estudiante, etc.).
2. **Configurar parámetros** de una carrera (plazos, notas mínimas, modalidades habilitadas).
3. **Gestionar instituciones patrocinadoras** para tutores externos.
4. **Configurar modalidades** disponibles por carrera con sus reglas.
5. **Generar reporte de auditoría** (quién hizo qué y cuándo).
6. **Habilitar nueva carrera** en el sistema con su propio reglamento.
7. **Resetear contraseñas** o desbloquear usuarios.

---

## 6. Restricciones

- ❌ **No puede aprobar/rechazar proyectos** (es facultad del Director).
- ❌ **No puede firmar actas** (eso es del Tribunal).
- ❌ **No puede revisar avances académicos** (eso es del Tutor).
- ❌ No puede modificar calificaciones registradas por el tribunal.
- ❌ No puede saltarse las reglas de negocio establecidas en el reglamento.
- ✅ Sí puede ver toda la información del sistema con fines de auditoría.
- ✅ Sí puede modificar configuraciones que afectan a futuras gestiones (no retroactivamente).

---

## 7. Parámetros configurables clave

El Administrador puede configurar (por carrera):

- Régimen académico (semestral / anual)
- Modalidades habilitadas
- Notas mínimas (Vía A, B, C / aprobación del documento / aprobación final)
- Plazos en días hábiles (asignación tribunal, revisión, correcciones)
- Duración máxima de defensa
- Ventana de firma de actas (por defecto 60 minutos)
- Cantidad de miembros del tribunal
- Vigencia del tema aprobado

---

## 8. Notificaciones que recibe

- Errores técnicos del sistema.
- Nuevos registros de usuarios pendientes de validación.
- Alertas de auditoría (acciones inusuales).
- Recordatorios de backup programados.
- Fallas en sincronización con eDocente.
- Solicitudes de soporte técnico.
