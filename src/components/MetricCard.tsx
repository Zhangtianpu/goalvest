import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string
  subtitle?: string
  className?: string
}

export function MetricCard({ label, value, subtitle, className }: MetricCardProps) {
  return (
    <div className={cn('rounded-xl p-4 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover', className)}>
      <p className="text-xs font-medium text-ink-200 mb-1">{label}</p>
      <p className="text-xl font-bold font-display">{value}</p>
      {subtitle && <p className="text-[10px] text-ink-200 mt-1">{subtitle}</p>}
    </div>
  )
}
