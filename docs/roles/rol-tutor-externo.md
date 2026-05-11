# Rol: Tutor Externo

> **Código del rol:** `tutor-externo`
> **Cantidad por carrera:** Múltiples (uno por proyecto de Trabajo Dirigido o Internado)
> **Mock asociado:** `/src/mocks/tutor-externo.json`

---

## 1. Identidad

El Tutor Externo es el **funcionario de la institución patrocinadora** donde el estudiante realiza su Trabajo Dirigido o Internado. **No es docente de la universidad**: es un profesional de la entidad receptora que actúa como supervisor directo del estudiante en el lugar de trabajo.

Solo aplica a las modalidades:
- `MOD-TRD` — Trabajo Dirigido
- `MOD-INT` — Internado

Su acceso al sistema es **limitado y específico** al proyecto que supervisa.

---

## 2. Responsabilidades principales

- **Supervisar al estudiante** durante el desarrollo del trabajo en la institución.
- **Emitir informes mensuales** del avance del estudiante.
- **Registrar seguimientos y revisiones** en el timeline del proyecto.
- **Emitir la evaluación cuantitativa final** del estudiante (puntaje sobre 15 pts en Internado).
- **Validar el informe final** del estudiante con su firma institucional.
- **Comunicar inasistencias o incidencias** al tutor interno.

---

## 3. Permisos por módulo

| Módulo | Permiso |
|--------|--------|
| Usuarios | Sin acceso |
| Configuración | Sin acceso |
| Proyectos | Ver solo proyectos asignados |
| Avance | Revisar avances con observaciones |
| Seguimiento | Registrar informes institucionales |
| Tribunales | Sin acceso |
| Calendario | Solo lectura |
| Notificaciones | Recibir notificaciones de su proyecto asignado |
| Reportes | Sin acceso |

---

## 4. Pantallas accesibles

- `/dashboard` — Vista con el proyecto asignado y informes pendientes
- `/proyectos/:id` — Detalle del proyecto asignado
- `/seguimiento/:id` — Timeline con capacidad de registrar informes institucionales
- `/calendario` — Vista de fechas clave (solo lectura)
- `/notificaciones` — Panel de notificaciones

---

## 5. Acciones clave en el sistema

1. **Registrar informe institucional mensual** en el timeline del proyecto.
2. **Adjuntar evaluación parcial** del desempeño del estudiante.
3. **Emitir evaluación final cuantitativa** (15 pts) al finalizar el trabajo.
4. **Adjuntar archivos institucionales** (carta de aceptación, contrato, evaluación).

---

## 6. Restricciones

- ❌ No puede aprobar avances académicos (eso lo hace el Tutor Interno).
- ❌ No puede ver otros proyectos fuera del suyo asignado.
- ❌ No puede ser miembro del tribunal.
- ❌ No tiene acceso a gestión académica del sistema.
- ✅ Solo accede al proyecto donde fue designado como tutor externo.
- ✅ Su evaluación cuantitativa es **obligatoria** para que el documento avance a defensa (Internado).

---

## 7. Datos requeridos al registrar Tutor Externo

- Nombre completo
- CI / Documento de identidad
- Cargo en la institución
- **Institución patrocinadora**
- Email institucional
- Teléfono de contacto
- **CV adjunto** (PDF)
- **Convenio Marco de Cooperación** para tener la documentación de que se puede hacer practicas en esa organización (PDF)

---

## 8. Notificaciones que recibe

- Asignación a un nuevo proyecto.
- Recordatorios de informe mensual pendiente.
- Solicitud de evaluación final cercana al cierre del trabajo.
- Confirmación de recepción de informes.
