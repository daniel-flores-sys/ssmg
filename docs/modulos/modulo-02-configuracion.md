# Módulo 02 — Configuración

> **Ruta:** `/configuracion`
> **Roles con acceso:** `administrador` (CRUD), `director` y `secretaria` (solo lectura)

---

## 1. Descripción

Gestión de los parámetros que controlan el comportamiento del sistema por carrera. Incluye modalidades, instituciones y parámetros generales. Todos los valores son configurables sin tocar código.

---

## 2. Vistas (pestañas)

La pantalla usa `Tabs` de shadcn con 3 secciones:

### 2.1 Parámetros generales
- Formulario editable con todos los campos de `ParametrosCarrera`:
  - Notas mínimas (documento, aprobación final).
  - Plazos en días hábiles (asignación tribunal, revisión, correcciones).
  - Tiempos en minutos (defensa, ventana de firma, espera en acto).
  - Vigencia del tema (años y gestiones).
  - Miembros del tribunal.
  - Régimen académico (semestral / anual).
- Botón **"Guardar cambios"** — solo Administrador.

### 2.2 Modalidades
- Listado de modalidades habilitadas para la carrera.
- Por cada modalidad: nombre, código, si requiere tutor, si requiere defensa, documentos requeridos.
- Botón **"Editar"** — abre un panel lateral (`Sheet`) con el formulario de la modalidad.
- Se puede habilitar/deshabilitar una modalidad sin eliminarla.

### 2.3 Instituciones
- Tabla de instituciones patrocinadoras para Trabajo Dirigido e Internado.
- Campos: nombre, tipo, convenio activo (badge), contacto.
- Acciones: crear, editar, activar/desactivar convenio.
- Al desactivar convenio: los tutores externos de esa institución quedan sin asignación nueva posible.

---

## 3. Reglas de negocio

- Los parámetros modificados aplican **desde el momento de guardar en adelante** — no retroactivamente.
- No se puede **deshabilitar una modalidad** que tenga proyectos activos en esa modalidad.
- No se puede **desactivar un convenio** si hay proyectos activos con tutores de esa institución.

---

## 4. Componentes shadcn/ui

`Tabs`, `Input`, `Select`, `Button`, `Sheet`, `Badge`, `Table`, `Switch` (habilitar/deshabilitar), `Toast`, `Alert`, `Skeleton`

---

## 5. Estados de UI obligatorios

| Estado | Componente |
|--------|-----------|
| Cargando configuración | `Skeleton` en cada sección |
| Sin instituciones | Mensaje: "No hay instituciones registradas" |
| Error al guardar | `Alert` con mensaje descriptivo |
| Guardado exitoso | `Toast` de confirmación |
