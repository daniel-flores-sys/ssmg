# AGENT.md — Contexto del Proyecto SSMG para Agentes de IA

**Regla principal**: Toda decisión de negocio, flujo, permiso o regla debe estar
respaldada por los archivos en `docs/`. Si no está documentado, pregunta al usuario
antes de asumir o inventar.

---

## Proyecto

**SSMG** — Sistema de Seguimiento de Modalidades de Graduación
Sistema web React para gestionar el proceso de titulación universitaria (Bolivia).

---

## Mapa de documentación

### Visión general
- [docs/SSMG_Documentacion.md](docs/SSMG_Documentacion.md) — Descripción del sistema, objetivos, requisitos no funcionales (≤2s respuesta, 99% disponibilidad, 150 usuarios concurrentes)

### Flujo de negocio y reglas académicas
- [docs/00-flujo-de-trabajo.md](docs/00-flujo-de-trabajo.md)
  - Modalidades: MOD-TES, MOD-PRG, MOD-TRD, MOD-INT, MOD-EXG
  - Estados del proyecto (borrador → graduado)
  - Plazos en días hábiles
  - Sistema de notas y umbrales mínimos
  - Reglas de firma de actas

### Stack y estructura de código
- [docs/01-especificaciones-tecnicas.md](docs/01-especificaciones-tecnicas.md)
  - React 18.2 + Vite 5 + React Router v6
  - shadcn/ui + Tailwind CSS 3.3
  - React Hook Form + Zod
  - Estructura de `src/` con mocks por rol en JSON
  - Colores institucionales

### Entidades y modelo de datos
- [docs/02-modelo-datos.md](docs/02-modelo-datos.md)
  - 12 entidades: Usuario, Carrera, Modalidad, Proyecto, Avance, Tribunal, Defensa, Acta, EventoSeguimiento, Notificacion, EventoCalendario, Institucion
  - IDs: UUID v4
  - Fechas: ISO 8601
  - Soft delete con `deleted_at`

### Permisos por rol
Leer el archivo de rol específico antes de implementar cualquier acción de UI o lógica de permisos:

| Rol | Archivo fuente |
|-----|---------------|
| Director | [docs/roles/rol-director.md](docs/roles/rol-director.md) |
| Secretaria | [docs/roles/rol-secretaria.md](docs/roles/rol-secretaria.md) |
| Tutor Interno | [docs/roles/rol-tutor-interno.md](docs/roles/rol-tutor-interno.md) |
| Tutor Externo | [docs/roles/rol-tutor-externo.md](docs/roles/rol-tutor-externo.md) |
| Tribunal | [docs/roles/rol-tribunal.md](docs/roles/rol-tribunal.md) |
| Estudiante | [docs/roles/rol-estudiante.md](docs/roles/rol-estudiante.md) |
| Administrador | [docs/roles/rol-administrador.md](docs/roles/rol-administrador.md) |

### Funcionalidad de módulos
Leer el módulo correspondiente antes de implementar cualquier feature:

| Módulo | Archivo fuente |
|--------|---------------|
| Usuarios (CRUD) | [docs/modulos/modulo-01-usuarios.md](docs/modulos/modulo-01-usuarios.md) |
| Configuración y parámetros | [docs/modulos/modulo-02-configuracion.md](docs/modulos/modulo-02-configuracion.md) |
| Proyectos y estados | [docs/modulos/modulo-03-proyectos.md](docs/modulos/modulo-03-proyectos.md) |
| Registro de avances | [docs/modulos/modulo-04-avance.md](docs/modulos/modulo-04-avance.md) |
| Timeline de seguimiento | [docs/modulos/modulo-05-seguimiento.md](docs/modulos/modulo-05-seguimiento.md) |
| Tribunales y firma de actas | [docs/modulos/modulo-06-tribunales-actas.md](docs/modulos/modulo-06-tribunales-actas.md) |
| Calendario, Notificaciones, Reportes | [docs/modulos/modulos-07-08-09.md](docs/modulos/modulos-07-08-09.md) |

---

## Restricciones de negocio con especificación exacta

No implementes estas reglas de memoria. Lee el archivo fuente indicado:

| Restricción | Fuente |
|-------------|--------|
| Firma de actas: orden estricto Presidente→V1→V2, ventana 1h, inmutable | modulo-06-tribunales-actas.md |
| Nota mínima documento: 26/50 para acceder a defensa | 00-flujo-de-trabajo.md |
| Nota mínima final: 51/100 para aprobar | 00-flujo-de-trabajo.md |
| Avance editable solo 24h desde creación | modulo-04-avance.md |
| Tutor Interno no puede ser Tribunal del mismo proyecto | rol-tutor-interno.md |
| Tutor Externo solo en MOD-TRD y MOD-INT | rol-tutor-externo.md |
| Director siempre preside el tribunal | rol-director.md |
| Cambio de modalidad requiere justificación + aprobación Director | modulo-03-proyectos.md |
| Prórroga del estudiante: única, máx. 30 días | rol-estudiante.md |
| Configuración no retroactiva (aplica desde el momento de guardar) | modulo-02-configuracion.md |

---

## Aspectos sin especificar (no implementar sin confirmación del usuario)

1. Formato exacto del Acta de Perfil (Hito 1)
2. Formato exacto del Acta de Defensa Privada (Hito 2)
3. Flujo detallado de la Defensa Privada
4. Cálculo de nota final en Examen de Grado (MOD-EXG)
5. Grupos/materias de Examen de Grado para carreras distintas a la principal

---

## Convenciones de código

- Datos mock organizados por rol en `src/mocks/` (formato JSON)
- Contextos globales: `AuthContext`, `ProyectosContext` en `src/context/`
- Validación con Zod en todos los formularios
- Componentes de UI exclusivamente de shadcn/ui
- Paleta de colores: `--primary #1e3d8c`, `--destructive #e30e17`, `--success #4caf50`, `--warning #fbbc14`
