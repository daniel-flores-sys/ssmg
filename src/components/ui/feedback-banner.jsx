import { useEffect } from 'react'
import { Alert, AlertDescription } from './alert'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FeedbackBanner({ feedback, onClear }) {
  useEffect(() => {
    if (!feedback) return
    const t = setTimeout(onClear, 3500)
    return () => clearTimeout(t)
  }, [feedback, onClear])

  if (!feedback) return null
  const esExito = feedback.tipo !== 'error'

  return (
    <Alert className={cn(
      esExito ? 'border-success/50 bg-success/10' : 'border-destructive/50 bg-destructive/10'
    )}>
      {esExito
        ? <CheckCircle2 className="h-4 w-4 text-success" />
        : <AlertCircle className="h-4 w-4 text-destructive" />}
      <AlertDescription className={cn('text-xs', esExito ? 'text-success' : 'text-destructive')}>
        {feedback.mensaje}
      </AlertDescription>
    </Alert>
  )
}
