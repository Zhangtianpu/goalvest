import type { RiskProfile, UserProfile } from '@/store/types'

export function getMonthlyIncome(profile: UserProfile): number {
  return profile.incomeMode === 'monthly'
    ? profile.annualIncome
    : profile.annualIncome / 12
}

export function getMonthlyExpense(profile: UserProfile): number {
  return profile.expenseMode === 'monthly'
    ? profile.annualExpense
    : profile.annualExpense / 12
}

export function calcAnnualSavings(profile: UserProfile): number {
  return profile.annualIncome - profile.annualExpense
}

export function calcSavingsRate(profile: UserProfile): number {
  if (profile.annualIncome <= 0) return 0
  return (calcAnnualSavings(profile) / profile.annualIncome) * 100
}

export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1).replace(/\.0$/, '') + '万'
  }
  return num.toLocaleString('zh-CN', { maximumFractionDigits: 0 })
}

export function formatCurrency(num: number): string {
  return '¥' + formatNumber(num)
}

export const RISK_LEVEL_LABELS: Record<RiskProfile['level'], string> = {
  conservative: '保守型',
  moderate: '稳健型',
  aggressive: '进取型',
}

export const SAVINGS_RATE_TIPS = [
  { min: 0, max: 10, levelKey: 'dangerous', color: '#E76F51' },
  { min: 10, max: 20, levelKey: 'low', color: '#D4A843' },
  { min: 20, max: 30, levelKey: 'healthy', color: '#52B788' },
  { min: 30, max: 50, levelKey: 'excellent', color: '#2D6A4F' },
  { min: 50, max: 100, levelKey: 'outstanding', color: '#1B4332' },
]

export function getSavingsRateTip(rate: number) {
  return SAVINGS_RATE_TIPS.find(t => rate >= t.min && rate < t.max) || SAVINGS_RATE_TIPS[SAVINGS_RATE_TIPS.length - 1]
}
