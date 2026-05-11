import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <p className="text-6xl font-bold text-muted-foreground">404</p>
        <h1 className="text-xl font-semibold">Página no encontrada</h1>
        <p className="text-sm text-muted-foreground">La ruta que buscas no existe.</p>
        <Button onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" />Ir al dashboard
        </Button>
      </div>
    </div>
  )
}
