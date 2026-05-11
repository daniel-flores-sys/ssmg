# Módulo 03 — Proyectos / Propuestas

> **Rutas:** `/proyectos`, `/proyectos/nuevo`, `/proyectos/:id`
> **Roles con acceso:** Todos (filtrado por rol)

---

## 1. Descripción

Módulo central del sistema. Gestiona el ciclo de vida completo de un proyecto de graduación desde el registro de la propuesta hasta la graduación. El formulario de registro es **dinámico**: los campos cambian según la modalidad seleccionada.

---

## 2. Vistas

### 2.1 Listado de proyectos (`/proyectos`)

**Filtrado por rol:**
| Rol | Qué ve |
|-----|--------|
| Director / Secretaria / Administrador | Todos los proyectos de la carrera |
| Tutor Interno | Solo proyectos donde es tutor asignado |
| Tutor Externo | Solo su proyecto asignado |
| Tribunal | Solo proyectos donde es miembro del tribunal |
| Estudiante | Solo su propio proyecto |

**Contenido:**
- Tabla con: estudiante, modalidad, estado (`Badge` con color), tutor, % avance (`Progress`), fecha de inicio.
- Filtros: modalidad, estado, tutor, período.
- Buscador por título o nombre del estudiante.

### 2.2 Formulario nuevo proyecto (`/proyectos/nuevo`)

Acceso: `estudiante` y `secretaria`.

**Paso 1 — Selección de modalidad:**
- Cards visuales con nombre y descripción de cada modalidad habilitada.
- Al seleccionar, aparecen los campos correspondientes.

**Campos comunes (todas las modalidades):**
- Título del trabajo.
- Descripción / resumen.
- Período (Grado I / Grado II).
- Documentos adjuntos (upload múltiple).

**Campos por modalidad:**
| Modalidad | Campos adicionales |
|-----------|-------------------|
| `MOD-TES` | Área de investigación |
| `MOD-PRG` | Subtipo (Pre-inversión / Plan Estratégico / Política Pública u otros según carrera) |
| `MOD-TRD` | Institución patrocinadora, tutor externo |
| `MOD-INT` | Institución patrocinadora, tutor externo, modalidad de tiempo (medio / completo) |
| `MOD-EXG` | Turno solicitado |

**Validación:**
- Todos los campos requeridos deben estar completos para enviar.
- La modalidad `MOD-TRD` e `MOD-INT` requieren institución con convenio activo.

### 2.3 Detalle de proyecto (`/proyectos/:id`)

**Secciones con `Tabs`:**
- **General:** datos del proyecto, estado actual, tutor(es), tribunal (si ya fue asignado).
- **Documentos:** listado de archivos adjuntos con opción de descarga.
- **Avances:** resumen de avances y % general (ver Módulo 04).
- **Seguimiento:** acceso al timeline (ver Módulo 05).
- **Historial:** cambios de estado y modalidad cronológicos.

**Acciones según rol y estado:**

| Acción | Rol | Estado requerido |
|--------|-----|-----------------|
| Enviar propuesta | Estudiante | `borrador` |
| Validar documentos | Secretaria | `en-revision` |
| Asignar tutor interno | Secretaria | `en-revision` |
| Aprobar / rechazar | Director | `en-revision` |
| Asignar tribunal | Director | `perfil-aprobado` |
| Aprobar cambio de modalidad | Director | Cualquiera activo |
| Solicitar cambio de modalidad | Estudiante | Cualquiera activo |

---

## 3. Flujo de estados

```
borrador → en-revision → perfil-aprobado → tribunal-asignado
    → con-observaciones (↔ correcciones del estudiante)
    → defensa-privada-programada → defensa-privada-aprobada
    → defensa-publica-programada → aprobado / reprobado → graduado
```

Restricciones:
- No se puede avanzar de estado sin cumplir los requisitos del estado actual.
- El estado `rechazado` es terminal — requiere iniciar un nuevo proyecto o cambiar de modalidad.
- El historial de estados es **inmutable** — solo se agregan entradas, nunca se editan.

---

## 4. Componentes shadcn/ui

`Card`, `Table`, `Badge`, `Progress`, `Tabs`, `Select`, `Input`, `Button`, `Dialog` (confirmar aprobación/rechazo), `Skeleton`, `Alert`, `Toast`, `ScrollArea`

---

## 5. Estados de UI obligatorios

| Estado | Componente |
|--------|-----------|
| Cargando listado | `Skeleton` sobre tabla |
| Sin proyectos | Mensaje según rol: "No tenés proyectos registrados" / "No hay proyectos en la carrera" |
| Error al enviar | `Alert` con detalle del error |
| Cambio de estado exitoso | `Toast` con nuevo estado |
