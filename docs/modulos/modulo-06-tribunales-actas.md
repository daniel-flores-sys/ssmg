# Módulo 06 — Tribunales y Actas

> **Rutas:** `/tribunales`, `/tribunales/:id/acta`
> **Roles con acceso:** `director` (designar), `secretaria` (gestionar), `tribunal` (firmar actas)

---

## 1. Descripción

Gestiona la designación de tribunales, la programación de defensas y la firma digital de actas para los 3 hitos del proceso: Perfil, Defensa Privada y Defensa Pública.

---

## 2. Vistas

### 2.1 Listado de tribunales (`/tribunales`)

- Tabla con: proyecto, modalidad, miembros del tribunal, estado del acta más reciente.
- Filtros: estado de acta, modalidad, período.
- Botón **"Asignar tribunal"** — solo `director`.

### 2.2 Formulario de tribunal (modal o página)

Acceso: `director`.

Campos:
- Proyecto (selector — solo proyectos en estado `perfil-aprobado`).
- Presidente: siempre el Director de Carrera (se autoasigna).
- Vocal 1: selector de docentes disponibles.
- Vocal 2: selector de docentes disponibles.

**Validación:**
- Un docente no puede ser tutor del proyecto Y miembro del tribunal al mismo tiempo.
- Un docente no puede aparecer dos veces en el mismo tribunal.

### 2.3 Programar defensa

Acceso: `secretaria`.

Campos:
- Tipo de defensa: Perfil / Privada / Pública.
- Fecha y hora.
- Lugar.
- Enlace virtual (opcional).

**Restricción:** solo se puede programar una defensa si el estado del proyecto lo permite.

### 2.4 Calificar documento y defensa

Acceso: `tribunal` (Presidente o Vocal, según flujo).

- Formulario con la rúbrica de evaluación del documento (50 pts).
- Formulario con la rúbrica de la defensa oral (50 pts).
- Campo de observaciones (obligatorio si hay observaciones subsanables).
- Resultado: `aprobado` / `aprobado-con-observaciones` / `reprobado`.

### 2.5 Firma de actas (`/tribunales/:id/acta`) — RESPONSIVE MÓVIL

**Esta vista está diseñada para usarse desde el teléfono durante el acto.**

Diseño:
- Fondo claro, tipografía grande y legible.
- Texto completo del acta generado automáticamente.
- Sección de firmas al final con 3 bloques: Presidente, Vocal 1, Vocal 2.

**Por cada bloque de firma:**
- Nombre completo en tipografía cursiva.
- Timestamp del momento de firma.
- Checkbox: "Confirmo que los datos del acta son correctos y firmo en conformidad."
- Botón **"Firmar"** — habilitado solo si:
  - La ventana de firma está activa (dentro de la hora desde inicio del acto).
  - El firmante anterior ya firmó.
  - El usuario autenticado corresponde al cargo.

**Estados visuales del bloque de firma:**
- 🔘 `Pendiente` — gris, botón deshabilitado.
- ⏳ `En espera` — el anterior no ha firmado aún.
- ✅ `Firmado` — verde, bloqueado, muestra timestamp.
- ❌ `Vencido` — rojo, venció la ventana de 1 hora.

---

## 3. Lógica crítica de firma

1. Al programar la defensa y marcarla como **iniciada**, se genera el acta y comienza la ventana de firma.
2. `ventanaFirmaFin = ventanaFirmaInicio + minutosVentanaFirma` (configurable, defecto 60 min).
3. Orden **estricto:** Presidente (orden 1) → Vocal 1 (orden 2) → Vocal 2 (orden 3).
4. Cada firma bloquea el campo **inmediatamente e irreversiblemente**.
5. Si `ahora > ventanaFirmaFin` y no están todas las firmas → estado `vencida`.
6. Acta `vencida` debe regenerarse manualmente por `secretaria` o `director`.
7. Acta válida = estado `firmada` (las 3 firmas completas).

---

## 4. Generación automática del acta

El texto del acta se genera con los datos del proyecto, defensa y tribunal en el momento de iniciar el acto. El formato base es el validado por el usuario (ver `00-flujo-de-trabajo.md`, sección 6).

Variables que se sustituyen automáticamente:
`[CIUDAD]`, `[LUGAR]`, `[HORA_INICIO]`, `[FECHA]`, `[MODALIDAD]`, `[APELLIDOS_ESTUDIANTE]`, `[NOMBRE_ESTUDIANTE]`, `[TITULO_TRABAJO]`, `[NOMBRE_DIRECTOR]`, `[NOMBRE_VOCAL1]`, `[NOMBRE_VOCAL2]`, `[RESULTADO]`, `[NOTA_NUMERICA]`, `[NOTA_LITERAL]`, `[HORA_FIN]`.

---

## 5. Componentes shadcn/ui

`Table`, `Card`, `Badge`, `Button`, `Dialog`, `Input`, `Select`, `Calendar`, `Checkbox`, `Separator`, `ScrollArea`, `Skeleton`, `Alert`, `Toast`

---

## 6. Estados de UI obligatorios

| Estado | Componente |
|--------|-----------|
| Cargando tribunal | `Skeleton` |
| Sin tribunales | Mensaje: "No hay tribunales asignados" |
| Ventana de firma activa | Contador regresivo visible (HH:MM) |
| Ventana vencida | `Alert` rojo: "El tiempo para firmar ha vencido" |
| Acta firmada | `Alert` verde: "Acta firmada por los 3 miembros" |
| Error al firmar | `Toast` con error |
