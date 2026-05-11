# Flujo de Trabajo — SSMG
## Sistema de Seguimiento de Modalidades de Graduación

> **Fuentes de verdad utilizadas:**
> - Reglamento de Modalidades de Graduación GAP — Octubre 2021
> - Guía de Elaboración de Documentos para Grado I y Grado II — Facultad de Tecnología, UMRPSFXCH (revisión abril 2015)
> - Sesiones de relevamiento con el usuario — Mayo 2026
>
> **Convenciones de este documento:**
> - ✅ **Confirmado** — regla documentada o validada por el usuario.
> - ⚠️ **Pendiente de confirmación** — regla no documentada; el sistema la dejará configurable o deshabilitada hasta que se confirme.
> - 🔧 **Configurable** — parámetro ajustable por carrera desde el Módulo de Configuración.

---

## 1. CONTEXTO DEL SISTEMA

### 1.1 Alcance multi-carrera
El SSMG es multi-carrera y multi-facultad. Cada carrera registrada en el sistema tiene su propio conjunto de parámetros configurables (plazos, notas mínimas, modalidades habilitadas). El reglamento GAP 2021 es el modelo base; otras carreras pueden tener variaciones menores en esos parámetros. ✅

### 1.2 Régimen académico
El sistema debe soportar carreras con régimen **semestral** y **anual**. ✅ 🔧

| Régimen | Grado I | Grado II | Duración mínima total |
|---------|---------|----------|-----------------------|
| Semestral | 1 semestre | 1 semestre | 2 semestres |
| Anual | 1/2 gestión | 1/2 gestión | 1 gestiones | (a confirmar) 

> **Nota:** En casos excepcionales, un estudiante muy avanzado puede completar el
> documento y defender en un solo período. Administrativamente siempre se tramita
> como si fueran dos períodos. ✅ El SSMG respeta esa lógica: registra el período
> de Grado I y el período de Grado II como entidades separadas.

---

## 2. MODALIDADES DE GRADUACIÓN

### 2.1 Cuadro general
| Código | Modalidad | ¿En SSMG? | ¿Tutor interno? | ¿Tutor externo? | ¿Documento escrito? | ¿Defensa? |
|--------|-----------|-----------|-----------------|-----------------|---------------------|-----------|
| `MOD-EXC` | Graduación por Excelencia | ❌ No — trámite directo | No | No | No | No |
| `MOD-EXG` | Examen de Grado | ❌ No - solo riende el examen | No | No | No | Sí (oral por materia) |
| `MOD-TES` | Tesis de Grado | ✅ Flujo completo | Sí | No | Sí | Sí |
| `MOD-PRG` | Proyecto de Grado | ✅ Flujo completo | Sí | No | Sí | Sí |
| `MOD-TRD` | Trabajo Dirigido | ✅ Flujo completo | Sí | Sí (institucional) | Sí | Sí |
| `MOD-INT` | Internado | ✅ Flujo completo | Sí | Sí (institucional) | Sí (informe) | Sí |

> **Graduación por Excelencia:** El sistema NO la registra ni hace seguimiento.
> El estudiante tramita directamente su diploma sin pasar por el SSMG. ✅

### 2.2 Tutor Externo — definición
En las modalidades `MOD-TRD` e `MOD-INT`, el tutor externo es el **funcionario de la institución patrocinadora** responsable del estudiante durante el trabajo, **no** un docente externo contratado por la carrera. ✅

El tutor externo tiene acceso limitado al sistema: puede registrar seguimientos, emitir informes institucionales y firmar el informe de evaluación final. Su rol en el sistema es `tutor-externo`.

---

## 3. LOS 3 HITOS DEL PROCESO DE GRADUACIÓN

**Fuente: Guía de Elaboración Grado I y Grado II — Facultad de Tecnología UMRPSFXCH**

Todo proyecto con documento escrito (Tesis, Proyecto de Grado, Trabajo Dirigido, Internado) pasa obligatoriamente por **3 hitos evaluados por tribunal:**

```
HITO 1 — Aprobación del Perfil (Grado I)
    ↓
HITO 2 — Aprobación de la Defensa Privada (Grado II — intermedia)
    ↓
HITO 3 — Aprobación de la Defensa Pública (Grado II — final)
```

Cada hito genera un **Acta oficial** firmada por el tribunal. ✅

| Hito | Nombre del acta | Descripción |
|------|-----------------|-------------|
| 1 | Acta de Perfil | Tribunal aprueba el perfil del trabajo |
| 2 | Acta de Defensa Privada | Tribunal evalúa el documento completo a puerta cerrada |
| 3 | Acta de Defensa Pública | Tribunal evalúa la exposición pública y emite nota final |

> ⚠️ **Pendiente de confirmación:** El formato exacto del Acta de Perfil y del
> Acta de Defensa Privada no ha sido proporcionado. Se implementará con una
> estructura análoga al Acta de Defensa Pública hasta que el usuario valide
> los formatos reales. El módulo de actas dejará el contenido como plantilla
> editable hasta entonces.

---

## 4. FLUJO COMPLETO — MODALIDADES CON DOCUMENTO ESCRITO

### FASE 1 — GRADO I: Registro y Aprobación del Perfil

#### 4.1 Estados en Grado I

```
[BORRADOR]
    ↓ Estudiante completa la propuesta y adjunta documentos según su vía
[EN REVISIÓN]
    ↓ Secretaría valida documentos (checklist automático por vía)
    ↓ Unidad de Investigación certifica no-duplicidad del tema
[PERFIL ACEPTADO]
    ↓ Director designa tribunal (máx. 3 días hábiles — Art. 59)
[TRIBUNAL ASIGNADO — GRADO I]
    ↓ Tribunal evalúa el perfil (máx. 15 días hábiles — Art. 65)
        → Observaciones subsanables → [CON OBSERVACIONES]
            ↓ Estudiante corrige (máx. 60 días hábiles — Art. 65b)
            ↓ Puede solicitar prórroga única de 30 días calendario (Art. 68)
            → Si no corrige en plazo → [RECHAZADO AUTOMÁTICAMENTE]
        → Aprobado → [HITO 1 COMPLETADO — PERFIL APROBADO]
```

#### 4.3 Paneles de evaluación en Grado I

Según el Reglamento GAP (Anexo 1), durante Grado I el docente de Seminario de Grado II evalúa el avance del perfil en **3 paneles parciales:**

| Panel | Puntaje máximo | Contenido evaluado |
|-------|---------------|-------------------|
| 1° Panel | 33 pts | Primer avance del perfil |
| 2° Panel | 33 pts | Segundo avance del perfil |
| 3° Panel | 34 pts | Exposición final (Contenido 10 / Dominio 8 / Claridad 6 / Defensa Crítica 10) |
| **TOTAL** | **100 pts** | Nota final de Seminario de Grado II |

> **Lógica del sistema:** El SSMG registra las notas de cada panel. La nota
> final de los 3 paneles determina la Vía de Acceso (A, B o C). Si la carrera
> no usa el sistema de paneles, este módulo puede desactivarse desde Configuración. 🔧

---

### FASE 2 — GRADO II: Desarrollo, Defensa Privada y Defensa Pública

#### 4.4 Estados en Grado II

```
[GRADO II — EN DESARROLLO]
    ↓ Estudiante registra avances del documento por capítulos
    ↓ Tutor interno revisa y aprueba/rechaza cada avance
    ↓ Tutor externo registra informes institucionales (si aplica)
[DOCUMENTO COMPLETO — LISTO PARA DEFENSA PRIVADA]
    ↓ Estudiante y tutor confirman que el documento está finalizado
    ↓ Director/Secretaría fija fecha de Defensa Privada
[DEFENSA PRIVADA PROGRAMADA]
    ↓ Se realiza la defensa privada ante el tribunal (a puerta cerrada)
        → Observaciones → [CON OBSERVACIONES — GRADO II]
            ↓ Estudiante corrige (plazo según dictamen del tribunal) 🔧
        → Aprobado → [HITO 2 COMPLETADO — DEFENSA PRIVADA APROBADA]
    ↓ Estudiante tramita requisitos para defensa pública
    ↓ Director/Secretaría fija fecha de Defensa Pública
[DEFENSA PÚBLICA PROGRAMADA]
    ↓ Se realiza la defensa pública (acto público, máx. 60 min + 30 ext.)
        → Nota documento (50 pts) + Nota defensa oral (50 pts) = Nota final
        → Nota final ≥ 51 → [HITO 3 — APROBADO]
        → Nota final < 51 → [REPROBADO — debe cambiar de modalidad]
[GRADUADO]
    ↓ Estudiante tramita diploma ante instancias universitarias
```

> ⚠️ **Pendiente de confirmación — Defensa Privada:**
> Se sabe que es el Hito 2 entre la aprobación del perfil y la defensa pública.
> Se implementará como presentación ante tribunal completo a puerta cerrada,
> con acta propia. El flujo exacto (si tiene su propia nota, si puede rechazar
> sin posibilidad de defensa pública, etc.) debe ser confirmado por el usuario
> antes de activar este módulo.

---

## 5. FLUJO SIMPLIFICADO — EXAMEN DE GRADO (`MOD-EXG`)

```
[SOLICITUD PRESENTADA]
    ↓ Estudiante presenta documentos dentro de los 30 días del mes
      anterior al turno (Art. 76)
[HABILITADO]
    ↓ Director notifica al tribunal con mínimo 48 h de anticipación (Art. 84)
[TURNO ASIGNADO]
    ↓ GRUPO 1 — Examen oral de materias básicas (máx. 60 min por examen)
        → Reprobado Grupo 1 → no puede pasar al Grupo 2
        → Aprobado Grupo 1 → habilitado para Grupo 2
[GRUPO 1 APROBADO]
    ↓ Sorteo de sub-grupo del Grupo 2 con 72 h de anticipación (Art. 83)
[GRUPO 2 — EXAMEN ORAL DEL SUB-GRUPO SORTEADO]
        → Aprobado → [HABILITADO PARA DIPLOMA]
        → Reprobado (1° vez) → puede repetir a los 60 días u otra modalidad
        → Reprobado (2° vez) → solo puede optar por otra modalidad no usada

[GRADUADO]
```

> ⚠️ **Pendiente de confirmación — Nota final del Examen de Grado:**
> No se pudo confirmar si la nota final es el promedio de las materias del
> examen, la suma, o si cada materia se aprueba individualmente.
> El sistema calculará la nota de forma **configurable por carrera** 🔧 hasta
> que se confirme la regla exacta.

### Grupos y sub-grupos — Carrera GAP

**Grupo 1 — Materias Básicas (obligatorio):**
- Introducción a la Gerencia y Administración Pública
- Contabilidad Gubernamental
- Ciencia Política y Teoría del Estado

**Grupo 2 — Sub-grupos (sorteo 72 h antes):**

| Sub-grupo | Materias |
|-----------|---------|
| Sub-grupo 1 | Derecho Constitucional Administrativo · Derecho Administrativo · Políticas Públicas |
| Sub-grupo 2 | Programación de operaciones y gestión presupuestaria · Planificación para el desarrollo territorial y sectorial · Planificación estratégica operativa, institucional y empresarial |
| Sub-grupo 3 | Gestión del Talento Humano en la Administración Pública · Gerencia Pública Empresarial y Modelos de Gestión · Administración de Bienes y Compras Públicas |
| Sub-grupo 4 | Diseño, formulación y preparación de proyectos · Administración y evaluación de proyectos · Gestión pública y control de gestión |

---

## 6. ACTAS — FORMATO Y LÓGICA

### 6.1 Acta de Defensa Pública (Hito 3) ✅
**Formato validado por el usuario.**

Campos que se generan automáticamente al registrar la defensa:

| Campo | Fuente de datos |
|-------|----------------|
| Ciudad y lugar | Configuración de la carrera |
| Fecha y hora de inicio | Fecha de defensa programada |
| Nombre completo del postulante (en mayúsculas: APELLIDOS, Nombre) | Datos del estudiante |
| Título del trabajo | Datos del proyecto |
| Modalidad | Modalidad del proyecto |
| Carrera a la que opta | Configuración de la carrera |
| Presidente del tribunal | Cargo: Director de Carrera |
| Vocales del tribunal (nombres y títulos académicos) | Datos del tribunal |
| Secretario del tribunal | Vocal 2 actúa como secretario |
| Resultado (APROBADO / REPROBADO) | Nota ingresada por tribunal |
| Calificación numérica y literal | Nota ingresada por tribunal |
| Hora de finalización | Registrada al cerrar el acta |

**Plantilla de texto (auto-generada):**
```
En la ciudad de [CIUDAD], [DEPARTAMENTO_ESTADO], en [LUGAR] a horas [HORA_INICIO]
del [DIA_SEMANA] [DIA] de [MES] del año [AÑO_EN_LETRAS], se procedió a la Defensa
Pública del [MODALIDAD] del postulante a [GRADO_ACADEMICO] en [CARRERA],
[APELLIDOS_EN_MAYUSCULAS], [NOMBRE], con el tema: "[TÍTULO_DEL_TRABAJO]".

El Tribunal estuvo conformado por el Director de la [UNIDAD_ACADEMICA],
[TITULO_ACADEMICO] [NOMBRE_DIRECTOR], como Presidente; los señores
[TITULO] [NOMBRE_VOCAL1], [TITULO] [NOMBRE_VOCAL2] e [TITULO] [NOMBRE_VOCAL3],
como vocales y secretario respectivamente.

Instalado el Tribunal por el Director de [NOMBRE_CARRERA], éste informó que el
postulante cumplió todos los requisitos que prescribe el Reglamento de Graduación
de la [UNIDAD_ACADEMICA] de la UMRPSFXCH para asumir la Defensa oral y pública
de su trabajo de grado.

Acto seguido, el Director solicitó al postulante hacer una exposición de los
objetivos y alcances del [TIPO_TRABAJO] presentado. Concluida la exposición y
absueltas las preguntas, el Tribunal en reunión reservada y en cumplimiento de
lo dispuesto por los Arts. [ARTICULOS_REGLAMENTO] del reglamento vigente, evaluó
el trabajo y la exposición correspondiente a: "[RESULTADO_EN_MAYUSCULAS]".

Calificación de [NOTA_NUMERICA] ([NOTA_EN_LETRAS]).

Por tanto, [APELLIDOS_EN_MAYUSCULAS], [NOMBRE], al haber [aprobado/reprobado]
la Defensa de su [MODALIDAD], [está habilitado para solicitar previo trámite
ante las instancias universitarias correspondientes, el Diploma Académico de
[GRADO_ACADEMICO] EN [CARRERA_EN_MAYUSCULAS] / no está habilitado para continuar
con esta modalidad].

Con lo que terminó el acto a horas [HORA_FIN], firmando para su constancia al
pie del documento el tribunal respectivo y el postulante.
```

### 6.2 Acta de Perfil (Hito 1)
⚠️ **Pendiente de confirmación.** Se implementará con estructura análoga al Acta de Defensa Pública, adaptada a la aprobación del perfil (sin nota numérica final, solo dictamen APROBADO / CON OBSERVACIONES / RECHAZADO).

### 6.3 Acta de Defensa Privada (Hito 2)
⚠️ **Pendiente de confirmación.** Misma situación que el Acta de Perfil.

### 6.4 Lógica de firma digital de actas ✅
1. El acta se genera automáticamente con todos los datos al registrar el hito correspondiente.
2. Se habilita una **ventana de firma de 1 hora** desde el inicio del acto.
3. El orden de firma es **estricto:** Presidente → Vocal 1 → Vocal 2.
4. Un vocal NO puede firmar hasta que el anterior haya firmado.
5. Cada firma registra: nombre completo en cursiva + timestamp + confirmación legal.
6. Al firmar, el campo queda **bloqueado e inmutable**.
7. El acta es válida **solo cuando los 3 han firmado**.
8. Si la ventana de 1 hora expira sin completar las firmas: estado `VENCIDA` — debe regenerarse.
9. La vista de firma es **responsive (móvil)** para firmar desde el teléfono durante el acto.

---

## 7. CONFORMACIÓN Y REGLAS DEL TRIBUNAL

### 7.1 Composición
- **Presidente:** Director de Carrera (o quien designe en su representación).
- **Vocal 1**
- **Vocal 2** (actúa también como Secretario del acta)

### 7.2 Reglas de asignación ✅
1. Relación del tema con la especialidad del docente.
2. Condición docente: Ordinario > Contrato con continuidad > Contrato a plazo fijo > Suplente.
3. Antigüedad como criterio secundario.
4. Equidad en cantidad de trabajos asignados por docente.

### 7.3 Restricción tutor–tribunal ✅
Un docente **NO puede ser miembro del tribunal de un proyecto en el que es tutor interno** del mismo proyecto. Sí puede ser tribunal en otros proyectos distintos donde no ejerce tutoría.

### 7.4 Docentes multi-carrera ✅
Un docente puede ser tutor o tribunal en proyectos de **más de una carrera** simultáneamente. El sistema gestiona este escenario.

---

## 8. REGISTRO DE AVANCES (GRADO II)

### 8.1 Flujo de avance
1. El estudiante crea un avance: título, descripción, porcentaje (0–100), archivos adjuntos.
2. **Restricción de edición:** solo dentro de las 24 horas de creación.
3. El tutor interno revisa y marca: APROBADO / RECHAZADO, con observaciones obligatorias en caso de rechazo.
4. El tutor externo puede registrar observaciones adicionales (solo en MOD-TRD e MOD-INT).

### 8.2 Avances por capítulo
El sistema organiza los avances en función de la estructura de capítulos definida por modalidad:

**Tesis de Investigación Científica:**
Cap. 1 Introducción / Cap. 2 Marco Contextual / Cap. 3 Sustento Teórico / Cap. 4 Diseño Metodológico / Cap. 5 Estudio de campo o experimentación / Cap. 6 Análisis e Interpretación de Resultados / Conclusiones / Recomendaciones

**Proyecto de Grado:**
Cap. 1 Introducción / Cap. 2 Marco Contextual / Cap. 3 Fundamento Teórico / Cap. 4 Ingeniería del Proyecto / Cap. 5 Análisis de Resultados / Conclusiones / Recomendaciones

**Trabajo Dirigido:**
Cap. 1 Introducción / Cap. 2 Condiciones Laborales y Académicas / Cap. 3 Métodos y Herramientas / Cap. 4 Informe Técnico del Trabajo / Conclusiones / Recomendaciones

**Internado:**
Estructura equivalente al Trabajo Dirigido, con énfasis en el Informe Institucional mensual.

---

## 9. SEGUIMIENTO MENSUAL — TRABAJO DIRIGIDO E INTERNADO

- El estudiante presenta **informes mensuales** a la Unidad de Investigación e Interacción.
- El docente de Seminario de Grado II (o docente de la Unidad, según perfil) hace seguimiento directo.
- El tutor externo (funcionario institucional) emite una **evaluación cuantitativa final** al término del trabajo.
- Esta evaluación contribuye a la nota del documento (ver rúbrica Internado-Tesis / Internado-Proyecto en sección 10).

---

## 10. EVALUACIÓN DEL DOCUMENTO (50 puntos)

> **Regla crítica:** Nota mínima del documento = **26/50** para autorizar defensa oral.
> Si el documento obtiene menos de 26 puntos, el trabajo es rechazado. ✅

### 10.1 Tesis de Grado y Trabajo Dirigido-Tesis (Art. 33a / Art. 53b.1)
| Parámetro | Puntaje |
|-----------|---------|
| Presentación formal y normas de redacción científica | 10 |
| Coherencia en formulación del problema, objetivos, hipótesis y diseño metodológico | 10 |
| Pertinencia y profundidad del Marco Teórico | 10 |
| Calidad y profundidad del análisis de resultados y propuesta | 20 |
| **TOTAL** | **50** |

### 10.2 Proyecto de Grado y Trabajo Dirigido-Proyecto (Art. 33b / Art. 53b.2)
| Parámetro | Puntaje |
|-----------|---------|
| Presentación formal y normas de redacción científica | 10 |
| Coherencia en la estructura del proyecto | 10 |
| Pertinencia y profundidad del análisis según guías metodológicas | 10 |
| Análisis Social, Económico y Financiero | 20 |
| **TOTAL** | **50** |

### 10.3 Internado-Tesis (Art. 53a.1)
| Parámetro | Puntaje |
|-----------|---------|
| Evaluación Institucional (tutor externo) | 15 |
| Coherencia en formulación del problema, objetivos, hipótesis y diseño metodológico y teórico | 10 |
| Calidad y profundidad del análisis de resultados y propuesta | 20 |
| Presentación formal y normas de redacción científica | 5 |
| **TOTAL** | **50** |

### 10.4 Internado-Proyecto (Art. 53a.2)
| Parámetro | Puntaje |
|-----------|---------|
| Evaluación Institucional (tutor externo) | 15 |
| Coherencia en la estructura del proyecto | 10 |
| Pertinencia y profundidad del análisis según guías metodológicas | 10 |
| Presentación formal y normas de redacción científica | 5 |
| **TOTAL** | **50** |

---

## 11. EVALUACIÓN DE LA DEFENSA ORAL (50 puntos)
**Aplicable a todas las modalidades con defensa pública (Art. 35 / Art. 55)**

| Parámetro | Puntaje |
|-----------|---------|
| Claridad en la exposición | 10 |
| Dominio del tema | 15 |
| Defensa crítica y argumentación | 25 |
| **TOTAL** | **50** |

**Nota final = Documento (50 pts) + Defensa oral (50 pts). Mínimo de aprobación: 51/100.** ✅

---

## 12. LÓGICA DE CAMBIO DE MODALIDAD

| Situación | Acción permitida |
|-----------|-----------------|
| Reprobado en defensa de Tesis o Proyecto de Grado | Debe optar por otra modalidad (Art. 37) |
| Reprobado en defensa de Trabajo Dirigido o Internado | Debe optar por otra modalidad (Art. 57) |
| Reprobado en Examen de Grado (1° vez) | Puede repetir a los 60 días u optar por otra modalidad |
| Reprobado en Examen de Grado (2° vez) | Solo puede optar por otra modalidad no usada |
| Reprobado en modalidad previa + reprobado 2 veces en Examen de Grado | Pierde el derecho a la licenciatura (Art. 94) |

> **Regla del sistema:** Todo cambio de modalidad requiere aprobación del Director
> y queda registrado en el historial del proyecto con justificación obligatoria.

---

## 13. PLAZOS OPERATIVOS (DÍAS HÁBILES SALVO INDICACIÓN)

| Acción | Plazo | Fuente |
|--------|-------|--------|
| Asignación de tribunal por Director | Máx. 3 días hábiles desde presentación | Art. 59 |
| Revisión del perfil/documento por tribunal | Máx. 15 días hábiles desde recepción | Art. 65 |
| Defensa tras dictamen favorable (Hito 1 y 2) | 5 a 10 días hábiles | Art. 65a |
| Corrección de observaciones subsanables | Máx. 60 días hábiles | Art. 65b |
| Nueva revisión tras correcciones | Máx. 15 días hábiles | Art. 65b |
| Prórroga única solicitada por estudiante | Máx. 30 días calendario | Art. 68 |
| Espera máxima en acto de defensa | 20 minutos desde hora oficial | Art. 70 |
| Solicitud de fuerza mayor | Máx. 48 horas desde primera citación | Art. 71 |
| Reprogramación por fuerza mayor | Máx. 15 días hábiles | Art. 71 |
| Vigencia del tema aprobado | 3 años calendario o 2 gestiones (lo primero) | Art. 27 |
| Ventana de firma de actas | 1 hora desde inicio del acto | SSMG |
| Re-examen tras reprobación Examen de Grado | Mínimo 60 días desde reprobación | Art. 93 |
| Solicitud de Examen de Grado | Dentro de los 30 días del mes anterior al turno | Art. 76 |
| Sorteo de sub-grupo Examen de Grado Grupo 2 | 72 horas antes del examen | Art. 83 |
| Notificación a tribunal Examen de Grado | Mínimo 48 horas antes | Art. 84 |

---

## 14. ROLES EN EL SISTEMA

### 14.1 Resumen de roles ✅

| Rol en sistema | Descripción | Notas |
|----------------|-------------|-------|
| `director` | Director de Carrera | Uno por carrera. Preside el tribunal. |
| `secretaria` | Secretaria / Coordinador | Uno por carrera. Rol unificado. |
| `tutor-interno` | Docente tutor de la universidad | Puede tutorizar en más de una carrera. No puede ser tribunal del mismo proyecto. |
| `tutor-externo` | Funcionario institucional (MOD-TRD / MOD-INT) | Responsable del estudiante en la institución. Acceso limitado. |
| `tribunal` | Docente miembro del tribunal | Puede ser tutor en otros proyectos. |
| `estudiante` | Postulante a graduación | Solo ve su propio proceso. |
| `administrador` | Personal de TI | Gestión de usuarios, parámetros, auditoría, backups. Rol separado de Secretaría. |

### 14.2 Observaciones clave
- **Director y Secretaría:** un solo usuario por rol por carrera. ✅
- **Administrador:** rol de TI, independiente de la carrera. No gestiona flujos académicos. ✅
- **Tutor-externo:** acceso restringido a seguimiento e informes del proyecto asignado. ✅

---

## 15. PARÁMETROS CONFIGURABLES POR CARRERA 🔧

Todos los siguientes valores son editables desde el Módulo de Configuración (rol Administrador y Director):

| Parámetro | Valor GAP 2021 | Tipo |
|-----------|---------------|------|
| Régimen académico | Semestral | Enum: semestral / anual |
| Promedio mínimo Excelencia | 75/100 | Número |
| Años para calcular promedio Excelencia | 4 | Número |
| Nota mínima Vía A (Seminario Grado II) | 71 | Número |
| Rango Vía B | 61–70 | Rango |
| Rango Vía C | 51–60 | Rango |
| Nota mínima del documento para defensa | 26/50 | Número |
| Nota mínima final de aprobación | 51/100 | Número |
| Días hábiles para asignar tribunal | 3 | Número |
| Días hábiles para revisar documento | 15 | Número |
| Días hábiles para correcciones | 60 | Número |
| Días calendario prórroga única | 30 | Número |
| Días hábiles para nueva revisión | 15 | Número |
| Duración máxima defensa (minutos) | 60 | Número |
| Extensión extraordinaria defensa (minutos) | 30 | Número |
| Ventana de firma de actas (minutos) | 60 | Número |
| Vigencia del tema (años) | 3 | Número |
| Vigencia del tema (gestiones) | 2 | Número |
| Duración internado medio tiempo (meses) | 6 | Número |
| Duración internado tiempo completo (meses) | 3 | Número |
| Miembros del tribunal | 3 | Número |
| Anticipación estudiante a defensa (minutos) | 30 | Número |
| Tiempo de espera máximo en acto (minutos) | 20 | Número |
| Paneles de evaluación en Grado I | 3 | Número |
| Uso de sistema de paneles | Habilitado | Booleano |
| Defensa privada habilitada | Habilitada | Booleano |
| Examen de Grado habilitado | Habilitado | Booleano |
| Modalidades disponibles | TES, PRG, TRD, INT, EXG | Multi-select |

---

## 16. PENDIENTES ANTES DE IMPLEMENTAR

Los siguientes puntos deben confirmarse con el usuario **antes de que Claude Code implemente los módulos relacionados:**

| # | Pendiente | Módulo afectado | Impacto |
|---|-----------|-----------------|---------|
| 1 | Formato exacto del Acta de Perfil (Hito 1) | Módulo 6 — Tribunales y Actas | Alto |
| 2 | Formato exacto del Acta de Defensa Privada (Hito 2) | Módulo 6 — Tribunales y Actas | Alto |
| 3 | Flujo exacto de la Defensa Privada (¿tiene nota propia?, ¿puede rechazar definitivo?) | Módulo 6 — Tribunales y Actas | Alto |
| 4 | Cálculo de nota final en Examen de Grado (promedio, suma o aprobación individual) | Módulo 3 — Proyectos | Medio |
| 5 | Grupos y materias de Examen de Grado para otras carreras (solo GAP documentado) | Módulo 2 — Configuración | Medio |