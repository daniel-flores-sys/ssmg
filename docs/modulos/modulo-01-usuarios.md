# Módulo 01 — Administración de Usuarios

> **Ruta:** `/usuarios`
> **Roles con acceso:** `administrador` (CRUD), `director` (solo lectura)

---

## 1. Descripción

Gestión completa de todos los usuarios del sistema. El Administrador puede crear, editar y desactivar usuarios de cualquier rol. El Director solo puede consultar el listado.

---

## 2. Vistas

### 2.1 Listado de usuarios (`/usuarios`)
- Tabla con: nombre, apellidos, rol, carrera, estado (activo/inactivo).
- Filtros: por rol, por carrera, por estado.
- Buscador por nombre, apellidos o CI.
- Botón **"Nuevo usuario"** (solo Administrador).
- Acción por fila: Ver detalle / Editar / Desactivar.

### 2.2 Formulario de usuario (`/usuarios/nuevo` y `/usuarios/:id/editar`)
- Campos comunes a todos los roles:
  - Nombre, Apellidos, CI, Email, Teléfono, Rol, Carrera.
- Campos adicionales por rol (aparecen dinámicamente):
  - **Estudiante:** Código universitario, estado académico, nota Seminario de Grado.
  - **Tutor Externo:** Cargo, institución (selector), CV (archivo PDF), contrato (archivo PDF).
  - **Tutor Interno / Tribunal:** Título académico, especialidad, condición docente, antigüedad.

### 2.3 Detalle de usuario (`/usuarios/:id`)
- Vista de solo lectura con todos los datos del usuario.
- Si es Tutor Externo: muestra institución y permite descargar CV y contrato.
- Historial de proyectos asociados (como tutor o tribunal).

---

## 3. Reglas de negocio

- Un usuario **desactivado** no puede iniciar sesión ni aparecer en selectores de asignación.
- No se puede **eliminar** un usuario con proyectos activos — solo desactivar.
- El rol **no puede modificarse** una vez el usuario tiene proyectos o actas registradas.
- El **Tutor Externo** debe estar vinculado a una institución con convenio activo.

---

## 4. Componentes shadcn/ui

`Table`, `Button`, `Input`, `Select`, `Dialog` (confirmar desactivación), `Badge` (estado activo/inactivo), `Skeleton`, `Alert`, `Toast`

---

## 5. Estados de UI obligatorios

| Estado | Componente |
|--------|-----------|
| Cargando listado | `Skeleton` sobre la tabla |
| Tabla vacía | Mensaje: "No hay usuarios registrados" |
| Error al guardar | `Alert` con mensaje descriptivo |
| Guardado exitoso | `Toast` de confirmación |
