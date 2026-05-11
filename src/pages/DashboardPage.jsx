import { useAuth } from '@/hooks/useAuth'
import { ROLES } from '@/utils/constants'
import DashboardDirector from '@/components/modules/dashboard/DashboardDirector'
import DashboardSecretaria from '@/components/modules/dashboard/DashboardSecretaria'
import DashboardTutorInterno from '@/components/modules/dashboard/DashboardTutorInterno'
import DashboardTutorExterno from '@/components/modules/dashboard/DashboardTutorExterno'
import DashboardTribunal from '@/components/modules/dashboard/DashboardTribunal'
import DashboardEstudiante from '@/components/modules/dashboard/DashboardEstudiante'
import DashboardAdministrador from '@/components/modules/dashboard/DashboardAdministrador'

const DASHBOARDS = {
  [ROLES.DIRECTOR]: DashboardDirector,
  [ROLES.SECRETARIA]: DashboardSecretaria,
  [ROLES.TUTOR_INTERNO]: DashboardTutorInterno,
  [ROLES.TUTOR_EXTERNO]: DashboardTutorExterno,
  [ROLES.TRIBUNAL]: DashboardTribunal,
  [ROLES.ESTUDIANTE]: DashboardEstudiante,
  [ROLES.ADMINISTRADOR]: DashboardAdministrador,
}

export default function DashboardPage() {
  const { rolActivo, usuario } = useAuth()
  const DashboardComponent = DASHBOARDS[rolActivo]

  if (!DashboardComponent) return null

  return <DashboardComponent usuario={usuario} />
}
