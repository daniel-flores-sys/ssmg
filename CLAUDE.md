# CLAUDE.md — Guía de Navegación del Proyecto SSMG

Este archivo le dice a Claude **dónde encontrar** la información del proyecto.
**No inventes nada**: si necesitas un detalle, lee el archivo correspondiente.

---

## ¿Qué es este proyecto?

**SSMG** — Sistema de Seguimiento de Modalidades de Graduación.
Sistema web para gestionar el proceso de titulación universitaria (Bolivia).
Lee [docs/SSMG_Documentacion.md](docs/SSMG_Documentacion.md) para el resumen general.

---

## Dónde está cada tipo de información

### Stack tecnológico y estructura de carpetas
→ [docs/01-especificaciones-tecnicas.md](docs/01-especificaciones-tecnicas.md)

Incluye: React 18, Vite 5, React Router v6, React Hook Form + Zod, shadcn/ui,
Tailwind CSS, jsPDF, date-fns, estructura de `src/`, lista de componentes shadcn requeridos,
paleta de colores institucional.

### Modelo de datos (entidades y campos)
→ [docs/02-modelo-datos.md](docs/02-modelo-datos.md)

Incluye: 12 entidades (Usuario, Proyecto, Avance, Tribunal, Defensa, Acta, etc.),
tipos de datos, relaciones, IDs UUID v4, soft delete con `deleted_at`.

### Flujo académico, estados del proyecto, plazos y reglas de negocio
→ [docs/00-flujo-de-trabajo.md](docs/00-flujo-de-trabajo.md)

Incluye: 5 modalidades soportadas, 3 hitos principales, estados del proyecto
(borrador → graduado), plazos en días hábiles, sistema de evaluación (notas mínimas),
reglas de firma de actas.

### Qué puede hacer cada rol
→ [docs/roles/](docs/roles/)

| Rol | Archivo |
|-----|---------|
| Director | [docs/roles/rol-director.md](docs/roles/rol-director.md) |
| Tribunal | [docs/roles/rol-tribunal.md](docs/roles/rol-tribunal.md) |
| Administrador | [docs/roles/rol-administrador.md](docs/roles/rol-administrador.md) |
| Estudiante | [docs/roles/rol-estudiante.md](docs/roles/rol-estudiante.md) |
| Tutor Interno | [docs/roles/rol-tutor-interno.md](docs/roles/rol-tutor-interno.md) |
| Tutor Externo | [docs/roles/rol-tutor-externo.md](docs/roles/rol-tutor-externo.md) |
| Secretaria | [docs/roles/rol-secretaria.md](docs/roles/rol-secretaria.md) |

### Funcionalidad de cada módulo
→ [docs/modulos/](docs/modulos/)

| Módulo | Archivo |
|--------|---------|
| 01 - Usuarios | [docs/modulos/modulo-01-usuarios.md](docs/modulos/modulo-01-usuarios.md) |
| 02 - Configuración | [docs/modulos/modulo-02-configuracion.md](docs/modulos/modulo-02-configuracion.md) |
| 03 - Proyectos | [docs/modulos/modulo-03-proyectos.md](docs/modulos/modulo-03-proyectos.md) |
| 04 - Avance | [docs/modulos/modulo-04-avance.md](docs/modulos/modulo-04-avance.md) |
| 05 - Seguimiento (Timeline) | [docs/modulos/modulo-05-seguimiento.md](docs/modulos/modulo-05-seguimiento.md) |
| 06 - Tribunales y Actas | [docs/modulos/modulo-06-tribunales-actas.md](docs/modulos/modulo-06-tribunales-actas.md) |
| 07/08/09 - Calendario, Notificaciones, Reportes | [docs/modulos/modulos-07-08-09.md](docs/modulos/modulos-07-08-09.md) |

---

## Reglas críticas que NO debes inventar

Estas reglas tienen especificaciones exactas en los docs. Léelas antes de implementar:

- **Firma de actas**: orden estricto Presidente → Vocal 1 → Vocal 2, ventana de 1 hora, inmutable.
  Fuente: [docs/modulos/modulo-06-tribunales-actas.md](docs/modulos/modulo-06-tribunales-actas.md)

- **Notas mínimas**: 26/50 en documento para acceder a defensa, 51/100 para aprobar.
  Fuente: [docs/00-flujo-de-trabajo.md](docs/00-flujo-de-trabajo.md)

- **Edición de avances**: solo durante 24h tras la creación.
  Fuente: [docs/modulos/modulo-04-avance.md](docs/modulos/modulo-04-avance.md)

- **Tutor Interno ≠ Tribunal**: un tutor no puede ser tribunal del mismo proyecto que tutoriza.
  Fuente: [docs/roles/rol-tutor-interno.md](docs/roles/rol-tutor-interno.md)

- **Modalidades de Tutor Externo**: solo MOD-TRD y MOD-INT.
  Fuente: [docs/roles/rol-tutor-externo.md](docs/roles/rol-tutor-externo.md)

- **Cambio de modalidad**: requiere justificación y aprobación del Director.
  Fuente: [docs/modulos/modulo-03-proyectos.md](docs/modulos/modulo-03-proyectos.md)

- **Prórroga del estudiante**: única, máximo 30 días.
  Fuente: [docs/roles/rol-estudiante.md](docs/roles/rol-estudiante.md)

---

## Pendientes sin especificar (no implementar sin confirmación)

1. Formato exacto del Acta de Perfil (Hito 1)
2. Formato exacto del Acta de Defensa Privada (Hito 2)
3. Flujo detallado de la Defensa Privada
4. Cálculo de nota final en Examen de Grado
5. Grupos/materias de Examen de Grado para otras carreras

---

## Colores institucionales

| Variable | Valor | Uso |
|----------|-------|-----|
| `--primary` | `#1e3d8c` | Azul institucional |
| `--destructive` | `#e30e17` | Rojo/errores |
| `--success` | `#4caf50` | Verde/éxito |
| `--warning` | `#fbbc14` | Amarillo/alerta |
