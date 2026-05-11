# Módulo 05 — Seguimiento de Avance (Timeline)

> **Ruta:** `/seguimiento/:id`
> **Roles con acceso:** Todos (permisos de escritura varían por rol)

---

## 1. Descripción

Vista cronológica completa de todo lo que ha ocurrido en un proyecto. Es el **registro de memoria** del proyecto: cada acción, revisión, comentario y cambio de estado queda registrado aquí en orden temporal.

---

## 2. Vista principal

- Timeline vertical con eventos ordenados de más reciente a más antiguo.
- Cada evento muestra:
  - Ícono según tipo de evento (lucide-react).
  - Autor (nombre + rol con `Badge`).
  - Fecha y hora.
  - Título y contenido del evento.
  - Archivos adjuntos (si tiene).
- Filtro por tipo de evento.

---

## 3. Tipos de eventos

| Tipo | Ícono sugerido | ¿Quién lo genera? |
|------|---------------|-------------------|
| `revision` | `FileCheck` | Tutor interno |
| `informe-institucional` | `Building2` | Tutor externo |
| `comentario` | `MessageSquare` | Estudiante, Administrador, Director |
| `cambio-estado` | `ArrowRightCircle` | Sistema (automático) |
| `cambio-modalidad` | `RefreshCw` | Sistema (automático al aprobar cambio) |
| `hito` | `Flag` | Sistema (automático al completar Hito 1, 2 o 3) |

---

## 4. Permisos de escritura

| Rol | Puede registrar |
|-----|----------------|
| Tutor Interno | `revision` |
| Tutor Externo | `informe-institucional` |
| Estudiante | `comentario` |
| Director / Secretaria / Administrador | `comentario` |
| Sistema | `cambio-estado`, `cambio-modalidad`, `hito` (automáticos) |

Los eventos generados por el sistema **no pueden editarse ni eliminarse**.

---

## 5. Formulario de nuevo evento

- Visible solo para roles con permiso de escritura.
- Campos: título, contenido (textarea), archivos adjuntos (opcional).
- El tipo de evento se asigna automáticamente según el rol del autor.

---

## 6. Componentes shadcn/ui

`ScrollArea`, `Badge`, `Avatar`, `Button`, `Textarea`, `Input`, `Separator`, `Skeleton`, `Alert`, `Toast`

---

## 7. Estados de UI obligatorios

| Estado | Componente |
|--------|-----------|
| Cargando timeline | `Skeleton` (varios items) |
| Sin eventos | Mensaje: "Este proyecto no tiene eventos registrados aún" |
| Error al registrar | `Alert` con mensaje |
| Evento registrado | `Toast` de confirmación |
