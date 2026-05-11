# Módulo 07 — Fechas y Calendario

> **Ruta:** `/calendario`
> **Roles con acceso:** Todos (CRUD para `director`, `secretaria`, `administrador`; solo lectura para el resto)

---

## 1. Descripción

Vista tipo agenda interna que muestra las fechas clave de todos los proyectos de la carrera, con un sistema de semáforo visual para indicar proximidad o vencimiento.

---

## 2. Vista principal

- Vista de lista agrupada por mes (no un calendario de cuadrícula).
- Cada evento muestra: título, tipo, proyecto/estudiante relacionado, fecha, semáforo.
- Filtros: por tipo de evento, por modalidad, por estado del semáforo.
- Botón **"Nuevo evento"** — solo roles con CRUD.

**Semáforo (calculado en runtime):**
| Color | Condición |
|-------|-----------|
| 🟢 Verde | Más de 5 días hábiles restantes |
| 🟡 Amarillo | 5 días hábiles o menos |
| 🔴 Rojo | Fecha vencida |

**Tipos de evento:**
- `defensa` — Defensa programada (perfil, privada o pública).
- `entrega` — Entrega de documentos o correcciones.
- `vencimiento` — Vencimiento de plazo (tema, prórroga, correcciones).
- `general` — Evento académico general de la carrera.

---

## 3. Formulario de evento

Campos: título, tipo, fecha, descripción, proyecto relacionado (opcional).

---

## 4. Componentes shadcn/ui

`Calendar`, `Card`, `Badge`, `Button`, `Select`, `Input`, `Dialog`, `Skeleton`, `Alert`, `Toast`

---

## 5. Estados de UI

| Estado | Componente |
|--------|-----------|
| Cargando | `Skeleton` |
| Sin eventos | "No hay eventos programados para este período" |
| Evento guardado | `Toast` |

---
---

# Módulo 08 — Notificaciones

> **Ruta:** `/notificaciones`
> **Roles con acceso:** Todos

---

## 1. Descripción

Panel de notificaciones in-app. Muestra alertas generadas automáticamente por el sistema según las acciones del flujo. No hay correo electrónico real en la demo.

---

## 2. Vista principal

- Listado de notificaciones ordenadas por fecha (más reciente primero).
- Badge con conteo de no leídas en la `Navbar`.
- Cada notificación: ícono por tipo, título, mensaje, fecha, estado (leída / no leída).
- Clic en notificación → marca como leída y navega a `accionUrl` si tiene.
- Botón **"Marcar todas como leídas"**.

**Tipos de notificación:**
| Tipo | Color del badge | Cuándo se genera |
|------|----------------|-----------------|
| `info` | Azul | Cambios de estado del proyecto |
| `alerta` | Amarillo | Plazos próximos a vencer |
| `urgente` | Rojo | Ventana de firma activa, plazo vencido |
| `exito` | Verde | Hito completado, acta firmada |

---

## 3. Reglas de negocio

- Las notificaciones se cargan del JSON mock del rol activo.
- Cada rol recibe solo las notificaciones de su ámbito.
- Las notificaciones son **solo lectura** — no se pueden eliminar en la demo.

---

## 4. Componentes shadcn/ui

`ScrollArea`, `Badge`, `Button`, `Separator`, `Skeleton`, `Alert`

---

## 5. Estados de UI

| Estado | Componente |
|--------|-----------|
| Cargando | `Skeleton` |
| Sin notificaciones | "No tenés notificaciones" |
| Todas leídas | Badge oculto en Navbar |

---
---

# Módulo 09 — Reportes y Dashboard

> **Ruta:** `/reportes`
> **Roles con acceso:** `director` (completo), `secretaria` (parcial), `administrador` (completo)

---

## 1. Descripción

Dashboard gerencial con métricas del estado de la carrera y herramientas de exportación a PDF y Excel.

---

## 2. Vista principal

### 2.1 Métricas (Cards de resumen)
- Total de proyectos activos.
- Proyectos por estado (barra o dona).
- Proyectos por modalidad.
- Porcentaje de avance general de la carrera.
- Defensas programadas para los próximos 30 días.
- Proyectos con plazos vencidos.

### 2.2 Gráficos (shadcn/ui Charts)
- **Barras:** proyectos por modalidad.
- **Línea:** evolución mensual de proyectos aprobados.
- **Dona:** distribución de estados actuales.

### 2.3 Reportes exportables

| Reporte | Formato | Acceso |
|---------|---------|--------|
| Por estudiante (detalle de su proceso) | PDF | Director, Secretaria, Admin |
| Por tutor (proyectos asignados y estado) | Excel | Director, Admin |
| Por modalidad (todos los proyectos de una modalidad) | Excel | Director, Admin |
| Por período / gestión | PDF + Excel | Director, Admin |
| Auditoría de acciones del sistema | Excel | Admin |

---

## 3. Exportación PDF (jsPDF)

Genera un PDF con: encabezado institucional, tabla de datos del reporte, fecha de generación y pie de página con el nombre del usuario que lo generó.

---

## 4. Exportación Excel (SheetJS)

Genera un archivo `.xlsx` con una hoja por tipo de dato. Los datos corresponden al período y filtros seleccionados.

---

## 5. Componentes shadcn/ui

`Card`, `Chart` (bar, line, pie/donut), `Button`, `Select` (filtros), `Table`, `Skeleton`, `Alert`, `Toast`, `Tabs`

---

## 6. Estados de UI

| Estado | Componente |
|--------|-----------|
| Cargando métricas | `Skeleton` en cada card |
| Sin datos para el período | "No hay proyectos registrados en este período" |
| Exportando | Botón con loading spinner |
| Exportación exitosa | `Toast`: "Reporte descargado correctamente" |
