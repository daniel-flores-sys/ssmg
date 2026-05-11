import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, FolderOpen, Users, Calendar, BarChart2, Bell,
  ClipboardList, Activity, Award, FileSignature, UserCog, Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'
import { NAV_POR_ROL, ROLES_LABELS } from '@/utils/constants'
import { getInitials } from '@/utils/helpers'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const ICONS = {
  LayoutDashboard, FolderOpen, Users, Calendar, BarChart2, Bell,
  ClipboardList, Activity, Award, FileSignature, UserCog, Settings,
}

export default function Sidebar({ collapsed = false }) {
  const { usuario, rolActivo, datos } = useAuth()
  const navItems = NAV_POR_ROL[rolActivo] ?? []
  const notificacionesNoLeidas = (datos?.notificaciones ?? []).filter(n => !n.leida).length

  return (
    <aside className={cn(
      'flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo / Branding */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-sidebar-border">
        <img
          src={`${import.meta.env.BASE_URL}usfx-small.png`}
          alt="USFX"
          className="w-8 h-8 object-contain shrink-0"
        />
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-xs font-semibold text-sidebar-foreground leading-tight truncate">SSMG</p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Modalidades de Graduación
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = ICONS[item.icon]
          const esBell = item.icon === 'Bell'
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary'
              )}
            >
              {Icon && <Icon className="w-4 h-4 shrink-0" />}
              {!collapsed && (
                <span className="flex-1">{item.label}</span>
              )}
              {!collapsed && esBell && notificacionesNoLeidas > 0 && (
                <Badge variant="destructive" className="text-xs px-1.5 py-0 h-4">
                  {notificacionesNoLeidas}
                </Badge>
              )}
            </NavLink>
          )
        })}
      </nav>

      <Separator />

      {/* Info usuario */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 shrink-0 bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center rounded-full">
            {getInitials(usuario?.nombre, usuario?.apellido)}
          </Avatar>
          {!collapsed && usuario && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {usuario.nombre} {usuario.apellido}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {ROLES_LABELS[rolActivo]}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
