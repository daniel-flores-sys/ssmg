import { createContext, useState, useEffect, useCallback } from 'react'

export const AuthContext = createContext(null)

const MOCKS = {
  director: () => import('@/mocks/director.json'),
  secretaria: () => import('@/mocks/secretaria.json'),
  'tutor-interno': () => import('@/mocks/tutor-interno.json'),
  'tutor-externo': () => import('@/mocks/tutor-externo.json'),
  tribunal: () => import('@/mocks/tribunal.json'),
  estudiante: () => import('@/mocks/estudiante.json'),
  administrador: () => import('@/mocks/administrador.json'),
}

export function AuthProvider({ children }) {
  const [rolActivo, setRolActivo] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [datos, setDatos] = useState({})
  const [cargando, setCargando] = useState(true)

  const cargarMock = useCallback(async (rol) => {
    if (!MOCKS[rol]) return
    try {
      const mod = await MOCKS[rol]()
      setDatos(mod.default)
      setUsuario(mod.default.usuarioActivo)
    } catch (err) {
      console.error('Error cargando mock:', err)
    }
  }, [])

  useEffect(() => {
    const rolGuardado = localStorage.getItem('ssmg_rol_activo')
    if (rolGuardado && MOCKS[rolGuardado]) {
      setRolActivo(rolGuardado)
      cargarMock(rolGuardado).finally(() => setCargando(false))
    } else {
      setCargando(false)
    }
  }, [cargarMock])

  const login = async (rol) => {
    setRolActivo(rol)
    localStorage.setItem('ssmg_rol_activo', rol)
    await cargarMock(rol)
  }

  const logout = () => {
    setRolActivo(null)
    setUsuario(null)
    setDatos({})
    localStorage.removeItem('ssmg_rol_activo')
  }

  const estaAutenticado = Boolean(rolActivo && usuario)

  return (
    <AuthContext.Provider value={{ rolActivo, usuario, datos, cargando, estaAutenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
