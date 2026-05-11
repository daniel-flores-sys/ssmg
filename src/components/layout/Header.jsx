import { Bell, LogOut, Menu, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Header({ onToggleSidebar, titulo }) {
  const { datos, logout } = useAuth()
  const navigate = useNavigate()
  const { isDark, toggle } = useTheme()
  const noLeidas = (datos?.notificaciones ?? []).filter(n => !n.leida).length

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={onToggleSidebar}>
          <Menu className="w-4 h-4" />
        </Button>
        {titulo && (
          <h1 className="text-xs font-medium text-foreground">{titulo}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative"
          onClick={() => navigate('/notificaciones')}
        >
          <Bell className="w-4 h-4" />
          {noLeidas > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 text-xs px-1 py-0 h-4 min-w-4 flex items-center justify-center"
            >
              {noLeidas}
            </Badge>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggle}
          title={isDark ? 'Modo claro' : 'Modo oscuro'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleLogout}
          title="Cerrar sesión"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
