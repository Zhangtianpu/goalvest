import { useCurrency } from '@/hooks/useCurrency'
import { DollarSign } from 'lucide-react'
import type { Currency } from '@/store/types'

interface CurrencySwitcherProps {
  variant?: 'light' | 'dark'
}

export default function CurrencySwitcher({ variant = 'dark' }: CurrencySwitcherProps) {
  const { currency, setCurrency, language } = useCurrency()

  const currencies: { code: Currency; label: string }[] = [
    { code: 'USD', label: language === 'en' ? 'USD ($)' : '美元 ($)' },
    { code: 'CNY', label: language === 'en' ? 'CNY (¥)' : '人民币 (¥)' },
  ]

  const textColor = variant === 'light' ? 'text-ink-400' : 'text-ink-300'
  const borderColor = variant === 'light' ? 'border-surface-200' : 'border-surface-600'
  const bgColor = variant === 'light' ? 'bg-white' : 'bg-surface-800'

  return (
    <div className="flex items-center gap-2">
      <DollarSign size={16} className={textColor} />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className={`${textColor} ${borderColor} ${bgColor} border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500`}
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  )
}
