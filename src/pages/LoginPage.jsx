import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROLES_LABELS } from '@/utils/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'

const CREDENCIALES_DEMO = {
  director: { email: 'rmenDez@usfx.bo', password: '123456' },
  secretaria: { email: 'c.silva@usfx.bo', password: '123456' },
  'tutor-interno': { email: 'p.vargas@usfx.bo', password: '123456' },
  'tutor-externo': { email: 'm.torres@techbolivia.com', password: '123456' },
  tribunal: { email: 'd.morales@usfx.bo', password: '123456' },
  estudiante: { email: 'ana.garcia@est.usfx.bo', password: '123456' },
  administrador: { email: 'l.fernandez@usfx.bo', password: '123456' },
}

export default function LoginPage() {
  const { login, estaAutenticado } = useAuth()
  const navigate = useNavigate()
  const [rolSeleccionado, setRolSeleccionado] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  if (estaAutenticado) {
    return <Navigate to="/dashboard" replace />
  }

  const handleLogin = async () => {
    if (!rolSeleccionado) {
      setError('Por favor selecciona un rol para continuar.')
      return
    }
    setError('')
    setCargando(true)
    try {
      await login(rolSeleccionado)
      navigate('/dashboard', { replace: true })
    } catch {
      setError('Error al iniciar sesión. Intenta nuevamente.')
    } finally {
      setCargando(false)
    }
  }

  const credenciales = rolSeleccionado ? CREDENCIALES_DEMO[rolSeleccionado] : null

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      {/* Contenido principal centrado */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">

          {/* Cabecera institucional */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-4">
              <img
                src={`${import.meta.env.BASE_URL}usfx-small.png`}
                alt="USFX"
                className="h-16 w-auto object-contain"
              />
              <img
                src={`${import.meta.env.BASE_URL}dtic-small.png`}
                alt="DTIC"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Universidad Mayor, Real y Pontificia de
              </p>
              <h1 className="text-base font-bold text-foreground leading-tight">
                San Francisco Xavier de Chuquisaca
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                Dirección de Tecnologías de Información y Comunicación
              </p>
            </div>
          </div>

          {/* Card de login */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Sistema de Seguimiento de Modalidades de Graduación
              </CardTitle>
              <CardDescription>
                Selecciona tu perfil para ingresar al sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="rol">Perfil de acceso</Label>
                <Select value={rolSeleccionado} onValueChange={setRolSeleccionado}>
                  <SelectTrigger id="rol">
                    <SelectValue placeholder="Selecciona tu perfil..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ROLES_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {credenciales && (
                <div className="rounded-lg bg-muted px-4 py-3 space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Credenciales demo
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Email:</span>{' '}
                    {credenciales.email}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Contraseña:</span>{' '}
                    {credenciales.password}
                  </p>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleLogin}
                disabled={cargando || !rolSeleccionado}
              >
                {cargando ? 'Iniciando sesión...' : 'Ingresar al sistema'}
              </Button>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            Entorno de demostración — los datos son ficticios
          </p>
        </div>
      </div>

      {/* Footer institucional */}
      <footer className="border-t border-border bg-background px-6 py-3">
        <div className="max-w-md mx-auto flex flex-col items-center gap-1 text-center">
          <p className="text-xs text-muted-foreground">
            Copyright © 2011 · Dirección de Tecnologías de Información y Comunicación · USFX · SI Versión 2.0
          </p>
          <p className="text-xs text-muted-foreground">
            Soporte Técnico:{' '}
            <a href="mailto:dtic.soporte@usfx.bo" className="text-primary hover:underline">
              dtic.soporte@usfx.bo
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
