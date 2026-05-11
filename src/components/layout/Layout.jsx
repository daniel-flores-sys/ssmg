import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { NAV_POR_ROL } from '@/utils/constants'
import { useAuth } from '@/hooks/useAuth'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const { rolActivo } = useAuth()
  const location = useLocation()

  const navItems = NAV_POR_ROL[rolActivo] ?? []
  const currentNav = navItems.find(item => location.pathname.startsWith(item.path))
  const titulo = currentNav?.label ?? 'SSMG'

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          onToggleSidebar={() => setCollapsed(c => !c)}
          titulo={titulo}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
