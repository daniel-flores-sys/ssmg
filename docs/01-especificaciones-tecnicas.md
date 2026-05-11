# Especificaciones Técnicas — SSMG
## Sistema de Seguimiento de Modalidades de Graduación

---

## 1. STACK TECNOLÓGICO

### 1.1 Dependencias principales

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "react-hook-form": "^7.50.0",
    "zod": "^3.22.0",
    "lucide-react": "^0.294.0",
    "jspdf": "^2.5.1",
    "xlsx": "^0.18.5",
    "date-fns": "^2.30.0",
    "clsx": "^2.0.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16"
  }
}
```

### 1.2 Versiones mínimas requeridas

| Herramienta | Versión mínima | Propósito |
|------------|----------------|----------|
| Node.js | 16.x o superior | Runtime de JavaScript |
| npm | 8.x o superior | Gestor de paquetes |
| React | 18.2.0 | Framework UI |
| TypeScript | 5.x (opcional) | Type safety (recomendado) |

---

## 2. CONFIGURACIÓN INICIAL — PASOS PARA CLAUDE CODE

### 2.1 Crear el proyecto Vite + React

```bash
npm create vite@latest ssmg-app -- --template react
cd ssmg-app
npm install
```

### 2.2 Instalar dependencias principales

```bash
# React Router
npm install react-router-dom

# Formularios y validación
npm install react-hook-form zod @hookform/resolvers

# UI y estilos
npm install -D tailwindcss postcss autoprefixer
npm install class-variance-authority clsx

# Iconos
npm install lucide-react

# Librerías de utilidad
npm install date-fns

# Exportación de documentos
npm install jspdf xlsx
```

### 2.3 Instalar y configurar shadcn/ui

```bash
# Instalar la CLI de shadcn
npm install -D @shadcn-ui/cli

# Inicializar shadcn en el proyecto
npx shadcn-ui@latest init

# (Seleccionar: TypeScript = No, CSS variables = Yes, usar defaults para el resto)
```

### 2.4 Instalar componentes específicos de shadcn/ui

Ver sección **2.5** para la lista completa. Se instalan con:

```bash
npx shadcn-ui@latest add [component-name]
```

---

## 3. ARQUITECTURA DEL PROYECTO

### 3.1 Estructura de carpetas

```
ssmg-app/
├── src/
│   ├── assets/                    # Imágenes, logos, etc.
│   │   └── logo.svg
│   │
│   ├── components/
│   │   ├── ui/                    # Componentes shadcn/ui (auto-generados)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── table.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   └── [otros componentes].tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx        # Navegación lateral colapsable
│   │   │   ├── Navbar.tsx         # Barra superior con usuario/notificaciones
│   │   │   ├── Layout.tsx         # Layout principal (sidebar + content + navbar)
│   │   │   └── RoleBasedRoute.tsx # Guard de rutas por rol
│   │   │
│   │   └── modules/               # Componentes específicos por módulo
│   │       ├── admin-usuarios/
│   │       │   ├── UsuariosTable.tsx
│   │       │   ├── FormularioUsuario.tsx
│   │       │   └── [otros].tsx
│   │       │
│   │       ├── configuracion/
│   │       │   ├── ParametrosGenerales.tsx
│   │       │   ├── GestionModalidades.tsx
│   │       │   ├── GestionInstituciones.tsx
│   │       │   └── [otros].tsx
│   │       │
│   │       ├── proyectos/
│   │       │   ├── ListadoProyectos.tsx
│   │       │   ├── FormularioProyecto.tsx
│   │       │   ├── DetalleProyecto.tsx
│   │       │   ├── FormularioDinamico.tsx  # Cambia según modalidad
│   │       │   └── [otros].tsx
│   │       │
│   │       ├── avance/
│   │       │   ├── RegistroAvance.tsx
│   │       │   ├── ListadoAvances.tsx
│   │       │   ├── RevisionAvance.tsx
│   │       │   └── [otros].tsx
│   │       │
│   │       ├── seguimiento/
│   │       │   ├── TimelineVisual.tsx      # Timeline del proyecto
│   │       │   ├── RegistroEvento.tsx
│   │       │   ├── DetalleSeguimiento.tsx
│   │       │   └── [otros].tsx
│   │       │
│   │       ├── tribunales/
│   │       │   ├── GestionTribunales.tsx
│   │       │   ├── FormularioTribunal.tsx
│   │       │   ├── FirmaActas.tsx          # Vista responsive para firmar
│   │       │   ├── GeneradorActas.tsx
│   │       │   ├── DetalleDefensa.tsx
│   │       │   └── [otros].tsx
│   │       │
│   │       ├── calendario/
│   │       │   ├── VistaCalendario.tsx
│   │       │   ├── EventoCalendario.tsx
│   │       │   ├── GestionEventos.tsx
│   │       │   └── [otros].tsx
│   │       │
│   │       ├── notificaciones/
│   │       │   ├── PanelNotificaciones.tsx
│   │       │   ├── ItemNotificacion.tsx
│   │       │   └── [otros].tsx
│   │       │
│   │       └── reportes/
│   │           ├── DashboardReportes.tsx
│   │           ├── ExportadorPDF.tsx
│   │           ├── ExportadorExcel.tsx
│   │           ├── GraficoMetricas.tsx
│   │           └── [otros].tsx
│   │
│   ├── context/                   # Context API providers
│   │   ├── AuthContext.tsx        # Gestión de autenticación y rol activo
│   │   ├── ProyectosContext.tsx   # Estado global de proyectos
│   │   ├── NotificacionesContext.tsx
│   │   └── [otros].tsx
│   │
│   ├── hooks/                     # Custom hooks
│   │   ├── useAuth.ts             # Hook para acceder a AuthContext
│   │   ├── useProyectos.ts
│   │   ├── useLocalStorage.ts     # Persistencia
│   │   └── [otros].ts
│   │
│   ├── mocks/                     # Datos mock por rol (JSON)
│   │   ├── director.json
│   │   ├── secretaria.json
│   │   ├── tutor-interno.json
│   │   ├── tutor-externo.json
│   │   ├── tribunal.json
│   │   ├── estudiante.json
│   │   ├── administrador.json
│   │   └── index.ts               # Exporta todos los mocks
│   │
│   ├── pages/                     # Componentes de página (rutas)
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── UsuariosPage.tsx
│   │   ├── ConfiguracionPage.tsx
│   │   ├── ProyectosPage.tsx
│   │   ├── DetalleProyectoPage.tsx
│   │   ├── AvancePage.tsx
│   │   ├── SeguimientoPage.tsx
│   │   ├── TribunalesPage.tsx
│   │   ├── FirmaActasPage.tsx
│   │   ├── CalendarioPage.tsx
│   │   ├── NotificacionesPage.tsx
│   │   ├── ReportesPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── routes/
│   │   └── AppRouter.tsx          # Configuración centralizada de rutas
│   │
│   ├── utils/
│   │   ├── constants.ts           # Constantes (estados, roles, etc.)
│   │   ├── helpers.ts             # Funciones utilitarias
│   │   ├── validators.ts          # Validaciones con Zod
│   │   ├── exportPDF.ts           # Lógica de exportación a PDF
│   │   ├── exportExcel.ts         # Lógica de exportación a Excel
│   │   ├── dateHelpers.ts         # Manejo de fechas con date-fns
│   │   └── [otros].ts
│   │
│   ├── App.tsx                    # Componente raíz
│   ├── App.css
│   ├── index.css                  # Estilos globales + Tailwind
│   └── main.jsx                   # Punto de entrada
│
├── public/
│   └── favicon.ico
│
├── index.html                     # HTML base
├── vite.config.js                 # Configuración de Vite
├── tailwind.config.js             # Configuración de Tailwind
├── postcss.config.js              # Configuración de PostCSS
├── package.json
├── package-lock.json
└── .gitignore
```

---

## 4. COMPONENTES SHADCN/UI REQUERIDOS

### 4.1 Tabla completa de componentes a instalar

| Componente | Uso en SSMG | Módulos donde aplica |
|------------|-------------|----------------------|
| `button` | Botones de acción generales | Todos |
| `card` | Contenedores de información | Todos |
| `input` | Campos de texto en formularios | Usuarios, Proyectos, Configuración |
| `label` | Etiquetas de formulario | Todos |
| `form` | Gestión de formularios (React Hook Form) | Proyectos, Usuarios, Configuración |
| `select` | Dropdowns selectores | Usuarios, Proyectos, Tribunales |
| `checkbox` | Casillas de verificación | Configuración, Usuarios |
| `radio` | Opciones excluyentes | Proyectos (modalidad), Usuarios |
| `table` | Tabla de listados (usuarios, proyectos) | Usuarios, Proyectos, Reportes |
| `dialog` | Ventanas modales de confirmación | Usuarios, Proyectos, Tribunales |
| `sheet` | Paneles laterales (sidebar en móvil) | Layout |
| `tabs` | Pestañas de contenido | Proyectos, Seguimiento, Tribunales |
| `badge` | Etiquetas de estado | Proyectos, Avance, Notificaciones |
| `avatar` | Foto de perfil del usuario | Navbar, Comentarios |
| `dropdown-menu` | Menús desplegables | Navbar (usuario), Tablas (acciones) |
| `progress` | Barras de progreso (% avance) | Proyectos, Dashboard |
| `skeleton` | Placeholder mientras carga | Todos (loading state) |
| `alert` | Mensajes de error/éxito | Todos |
| `toast` | Notificaciones tipo toast | Todos (al guardar/enviar) |
| `tooltip` | Tooltips informativos | Formularios, Tablas |
| `calendar` | Selector de fechas | Tribunales, Calendario, Defensa |
| `popover` | Popups pequeños | Calendario, Botones de acción |
| `scroll-area` | Área con scroll personalizado | Listas largas |
| `separator` | Líneas divisoras | Separación visual en cards |
| `chart` | Gráficos (shadcn charts) | Reportes, Dashboard |
| `pagination` | Paginación de tablas | Usuarios, Proyectos |

### 4.2 Comando de instalación (copiar y pegar)

```bash
npx shadcn-ui@latest add button card input label form select checkbox radio table dialog sheet tabs badge avatar dropdown-menu progress skeleton alert toast tooltip calendar popover scroll-area separator chart pagination
```

---

## 5. PALETA DE COLORES INSTITUCIONAL

### 5.1 Variables CSS (en `src/index.css`)

```css
:root {
  /* Colores institucionales */
  --color-primary: #1e3d8c;        /* Azul institucional */
  --color-primary-light: #e8edf8;  /* Azul claro (fondos) */
  --color-danger: #e30e17;         /* Rojo institucional */
  --color-warning: #fbbc14;        /* Amarillo institucional */
  --color-success: #4caf50;        /* Verde (aprobado) */
  --color-dark: #1c1c1b;           /* Negro institucional */
  
  /* Colores del sistema */
  --color-surface: #ffffff;
  --color-muted: #f4f4f5;
  --color-border: #e4e4e7;
  --color-text: #18181b;
  --color-text-secondary: #71717a;
}
```

### 5.2 Integración con Tailwind (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## 6. CONFIGURACIÓN DE VITE

### 6.1 `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
```

---

## 7. CONFIGURACIÓN DE TAILWIND

### 7.1 `tailwind.config.js` (completo)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e3d8c",
          light: "#e8edf8",
        },
        danger: "#e30e17",
        warning: "#fbbc14",
        success: "#4caf50",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 7.2 `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 8. GESTIÓN DE ESTADO — CONTEXT API

### 8.1 AuthContext (ejemplo de estructura)

```typescript
// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [rolActivo, setRolActivo] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [datos, setDatos] = useState({})

  useEffect(() => {
    // Leer del localStorage al iniciar
    const rolGuardado = localStorage.getItem('ssmg_rol_activo')
    if (rolGuardado) {
      setRolActivo(rolGuardado)
      // Cargar mock del rol
      import(`@/mocks/${rolGuardado}.json`).then(mod => {
        setDatos(mod.default)
        setUsuario(mod.default.usuarioActivo)
      })
    }
  }, [])

  const cambiarRol = (nuevoRol) => {
    setRolActivo(nuevoRol)
    localStorage.setItem('ssmg_rol_activo', nuevoRol)
    // Cargar datos del nuevo rol...
  }

  return (
    <AuthContext.Provider value={{ rolActivo, usuario, datos, cambiarRol }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### 8.2 Custom Hook `useAuth`

```typescript
// src/hooks/useAuth.ts
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
```

---

## 9. ENRUTAMIENTO — REACT ROUTER V6

### 9.1 `src/routes/AppRouter.tsx` (estructura general)

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import UsuariosPage from '@/pages/UsuariosPage'
import ConfiguracionPage from '@/pages/ConfiguracionPage'
import ProyectosPage from '@/pages/ProyectosPage'
import DetalleProyectoPage from '@/pages/DetalleProyectoPage'
import TribunalesPage from '@/pages/TribunalesPage'
import FirmaActasPage from '@/pages/FirmaActasPage'
import NotFoundPage from '@/pages/NotFoundPage'
import RoleBasedRoute from '@/components/layout/RoleBasedRoute'
import Layout from '@/components/layout/Layout'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas protegidas por rol */}
        <Route element={<RoleBasedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/usuarios" element={<RoleBasedRoute requiredRoles={['administrador', 'director']}><UsuariosPage /></RoleBasedRoute>} />
            <Route path="/configuracion" element={<RoleBasedRoute requiredRoles={['administrador', 'director']}><ConfiguracionPage /></RoleBasedRoute>} />
            <Route path="/proyectos" element={<ProyectosPage />} />
            <Route path="/proyectos/:id" element={<DetalleProyectoPage />} />
            <Route path="/tribunales" element={<RoleBasedRoute requiredRoles={['director', 'secretaria']}><TribunalesPage /></RoleBasedRoute>} />
            <Route path="/tribunales/:id/acta" element={<FirmaActasPage />} />
            {/* Más rutas... */}
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

## 10. PERSISTENCIA DE DATOS

### 10.1 localStorage (demostración)

**Clave principal:** `ssmg_rol_activo` — guarda el rol seleccionado al iniciar sesión.

```typescript
// Guardar rol
localStorage.setItem('ssmg_rol_activo', 'director')

// Recuperar rol
const rolActivo = localStorage.getItem('ssmg_rol_activo')

// Limpiar (logout)
localStorage.removeItem('ssmg_rol_activo')
```

### 10.2 Custom Hook para localStorage

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
```

---

## 11. EXPORTACIÓN DE DOCUMENTOS

### 11.1 Exportar a PDF (jsPDF)

```typescript
// src/utils/exportPDF.ts
import jsPDF from 'jspdf'

export const generarActaDefensa = (datos) => {
  const doc = new jsPDF()
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  
  doc.text(`En la ciudad de ${datos.ciudad}...`, 20, 20)
  doc.text(`Acta de Defensa Pública`, 20, 40, { align: 'center' })
  
  // Más contenido...
  
  doc.save(`Acta_${datos.apellidoEstudiante}.pdf`)
}
```

### 11.2 Exportar a Excel (SheetJS)

```typescript
// src/utils/exportExcel.ts
import * as XLSX from 'xlsx'

export const exportarReporte = (datos, nombreArchivo) => {
  const ws = XLSX.utils.json_to_sheet(datos)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Reporte')
  XLSX.writeFile(wb, `${nombreArchivo}.xlsx`)
}
```

---

## 12. VALIDACIÓN DE FORMULARIOS (Zod + React Hook Form)

### 12.1 Ejemplo de esquema Zod

```typescript
// src/utils/validators.ts
import { z } from 'zod'

export const schemaProyecto = z.object({
  titulo: z.string().min(5, 'Título debe tener al menos 5 caracteres'),
  modalidad: z.enum(['MOD-TES', 'MOD-PRG', 'MOD-TRD', 'MOD-INT']),
  descripcion: z.string().min(20, 'Descripción debe ser más detallada'),
  tutorInterno: z.string().uuid('Tutor inválido'),
  tutorExterno: z.string().uuid().optional(),
})

export type ProyectoFormData = z.infer<typeof schemaProyecto>
```

### 12.2 Uso en componente

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaProyecto } from '@/utils/validators'

export default function FormularioProyecto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaProyecto),
  })

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('titulo')} />
      {errors.titulo && <span>{errors.titulo.message}</span>}
      {/* Más campos... */}
    </form>
  )
}
```

---

## 13. ESTADOS DE UI — OBLIGATORIOS EN TODOS LOS COMPONENTES

Cada componente que cargue datos debe implementar estos estados:

### 13.1 Loading
```typescript
{isLoading && <Skeleton className="h-12 w-full" />}
```

### 13.2 Empty State
```typescript
{data.length === 0 && (
  <Alert>
    <AlertTitle>Sin datos</AlertTitle>
    <AlertDescription>No hay proyectos registrados aún.</AlertDescription>
  </Alert>
)}
```

### 13.3 Error State
```typescript
{error && (
  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
)}
```

### 13.4 Success
```typescript
<Toast>
  <ToastTitle>Éxito</ToastTitle>
  <ToastDescription>Proyecto registrado correctamente.</ToastDescription>
</Toast>
```

---

## 14. REQUISITOS ADICIONALES

### 14.1 Paquetes opcionales recomendados

```bash
# Para manejo de fechas avanzado
npm install date-fns

# Para utilidades de tipos
npm install clsx class-variance-authority

# Para desarrollo mejorado
npm install -D @types/react @types/react-dom
```

### 14.2 Variables de entorno (`.env` — si aplica)

```
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=SSMG
VITE_APP_VERSION=1.0.0
```

### 14.3 Archivo `.gitignore`

```
node_modules/
dist/
.env.local
.env.*.local
*.log
.DS_Store
```

---

## 15. COMANDOS DE DESARROLLO

```bash
# Instalar dependencias
npm install

# Desarrollo (servidor en http://localhost:3000)
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview

# Lint (si se configura ESLint)
npm run lint
```

---

## 16. NOTAS IMPORTANTES PARA CLAUDE CODE

1. **NO agregar librerías fuera de este stack** sin aprobación explícita.
2. **Todos los componentes en español** en labels, botones, mensajes.
3. **Nombres de archivos y variables en inglés** (convención de código).
4. **Estados de UI obligatorios** en TODOS los listados y formularios.
5. **Responsive design** — especialmente crítico para el módulo de Tribunales (firma de actas móvil).
6. **Accesibilidad (a11y)** — usar labels en formularios, aria-labels donde corresponda.
7. **UUID para todos los IDs** — usar `crypto.randomUUID()` o librería `uuid`.
8. **ISO 8601 para fechas** — formato `YYYY-MM-DD` en strings, usar `Date` objects en lógica.
9. **localStorage solo para demo** — esta no es una solución de producción; está marcada como tal.
10. **Firma digital de actas** — implementar con 1 hora de ventana, orden estricto (Presidente → Vocal 1 → Vocal 2), bloqueo inmutable tras firma.
