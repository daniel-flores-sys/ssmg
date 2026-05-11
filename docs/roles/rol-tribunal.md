# Rol: Tribunal

> **Código del rol:** `tribunal`
> **Cantidad por carrera:** Múltiples (cada proyecto tiene 3 miembros: Presidente + Vocal 1 + Vocal 2)
> **Mock asociado:** `/src/mocks/tribunal.json`

---

## 1. Identidad

El Tribunal es el **órgano evaluador colegiado** que revisa, califica y aprueba los trabajos de graduación. Está conformado por 3 docentes designados por el Director de Carrera.

**Composición:**
- **Presidente** — Director de Carrera (o quien lo represente)
- **Vocal 1**
- **Vocal 2** — Actúa también como Secretario del acta

Un docente puede ser miembro del tribunal en **varios proyectos** y en **varias carreras**, siempre que no sea tutor del mismo proyecto.

---

## 2. Responsabilidades principales

- **Revisar el documento** entregado por el estudiante (perfil, documento completo).
- **Emitir dictamen** en cada hito: APROBADO / CON OBSERVACIONES / RECHAZADO.
- **Calificar el documento** según rúbrica (50 pts).
- **Calificar la defensa oral** según rúbrica (50 pts).
- **Firmar digitalmente las actas** de cada hito (Perfil, Defensa Privada, Defensa Pública).
- **Asistir a las defensas** programadas según calendario.

---

## 3. Permisos por módulo

| Módulo | Permiso |
|--------|--------|
| Usuarios | Sin acceso |
| Configuración | Sin acceso |
| Proyectos | Ver solo proyectos asignados |
| Avance | Sin acceso |
| Seguimiento | Sin acceso |
| Tribunales | Firmar actas / Calificar |
| Calendario | Solo lectura |
| Notificaciones | Recibir notificaciones de proyectos asignados |
| Reportes | Sin acceso |

---

## 4. Pantallas accesibles

- `/dashboard` — Vista con proyectos asignados y actas pendientes
- `/proyectos/:id` — Detalle del proyecto asignado (lectura)
- `/tribunales/:id/acta` — **Firma de actas (responsive móvil — diseñado para usar desde teléfono)**
- `/calendario` — Vista de defensas programadas
- `/notificaciones` — Panel de notificaciones

---

## 5. Acciones clave en el sistema

1. **Revisar el documento** entregado por el estudiante (descargar PDF).
2. **Emitir observaciones** sobre el documento (si corresponde).
3. **Calificar el documento** según rúbrica establecida (50 pts).
4. **Calificar la defensa oral** durante el acto (50 pts).
5. **Firmar el acta digitalmente** desde el teléfono durante el acto.

---

## 6. Lógica de firma de actas — CRÍTICA

1. La firma se habilita en una **ventana de 1 hora** desde el inicio del acto.
2. **Orden estricto:** Presidente → Vocal 1 → Vocal 2.
3. Un vocal **no puede firmar** hasta que el anterior haya firmado.
4. Cada firma queda **bloqueada e inmutable** una vez registrada.
5. El acta es válida **solo cuando los 3 han firmado**.
6. Si la ventana expira, el acta queda en estado `Vencida` y debe regenerarse.
7. Cada firma muestra: nombre completo en cursiva + timestamp + checkbox de confirmación legal.

---

## 7. Restricciones

- ❌ **No puede ser tutor del mismo proyecto** donde es tribunal.
- ❌ No puede ver proyectos donde no está asignado.
- ❌ No puede modificar calificaciones después de firmar.
- ❌ No puede firmar fuera de la ventana de 1 hora.
- ❌ No puede saltar el orden de firma.
- ✅ Sí puede ser tribunal en varios proyectos simultáneamente.
- ✅ Sí puede tutorizar otros proyectos donde no es tribunal.

---

## 8. Notificaciones que recibe

- Asignación a un nuevo tribunal.
- Recordatorio de defensa programada (24 h antes).
- Habilitación de ventana de firma (al iniciar el acto).
- Recordatorio de firma pendiente (cuando el anterior ya firmó).
- Confirmación de acta firmada por todos.
