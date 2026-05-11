# Módulo 04 — Avance de Proyecto

> **Ruta:** `/proyectos/:id/avance`
> **Roles con acceso:** `estudiante` (crear), `tutor-interno` y `tutor-externo` (revisar), `director` / `secretaria` / `administrador` (ver)

---

## 1. Descripción

El estudiante registra avances periódicos de su trabajo. El tutor interno revisa y aprueba o rechaza cada avance. El porcentaje general del proyecto se calcula en base a los avances aprobados.

---

## 2. Vistas

### 2.1 Listado de avances

- Lista ordenada cronológicamente (más reciente primero).
- Por cada avance: título, capítulo, porcentaje, estado (`Badge`), fecha, tutor revisor.
- `Progress` general del proyecto (promedio de avances aprobados).
- Botón **"Registrar avance"** — solo visible para el `estudiante`.

### 2.2 Formulario de nuevo avance (solo `estudiante`)

Campos:
- Título del avance.
- Capítulo al que corresponde (selector según modalidad).
- Descripción / contenido del avance.
- Porcentaje completado (0-100) — slider o input numérico.
- Archivos adjuntos (upload múltiple: PDF, Word, imágenes).

**Regla:** Solo se puede enviar si el proyecto está en estado `tribunal-asignado` o posterior dentro de Grado II.

### 2.3 Detalle de avance

- Vista completa del avance con todos sus datos.
- Archivos adjuntos descargables.
- Sección de observaciones del tutor (si fue revisado).
- **Botón "Editar":** visible solo para el `estudiante` y solo si `ahora < editableHasta`.
- **Acciones del tutor** (`tutor-interno`): aprobar o rechazar con observaciones obligatorias.

---

## 3. Reglas de negocio

- **Edición:** el estudiante puede editar un avance solo dentro de las **24 horas** desde su creación. Pasado ese tiempo, queda bloqueado.
- **Aprobación:** solo el tutor interno asignado al proyecto puede aprobar o rechazar avances.
- **Tutor externo:** puede dejar observaciones en avances de `MOD-TRD` e `MOD-INT`, pero no aprueba ni rechaza.
- **Porcentaje general:** se recalcula automáticamente cada vez que un avance cambia de estado.

---

## 4. Cálculo del porcentaje general

```
porcentajeGeneral = promedio de `porcentaje` de todos los avances con estado `aprobado`
```

Si no hay avances aprobados → `porcentajeGeneral = 0`.

---

## 5. Componentes shadcn/ui

`Card`, `Badge`, `Progress`, `Button`, `Input`, `Textarea`, `Select` (capítulo), `Slider`, `Dialog` (confirmar rechazo), `Skeleton`, `Alert`, `Toast`, `ScrollArea`

---

## 6. Estados de UI obligatorios

| Estado | Componente |
|--------|-----------|
| Cargando avances | `Skeleton` |
| Sin avances | Mensaje: "No hay avances registrados aún" |
| Avance bloqueado (> 24h) | Botón editar deshabilitado con `Tooltip`: "El plazo de edición venció" |
| Rechazo enviado | `Toast` de confirmación |
| Aprobación enviada | `Toast` de confirmación |
