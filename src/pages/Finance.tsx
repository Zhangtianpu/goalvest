import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import {
  calcAnnualSavings,
  calcSavingsRate,
  getSavingsRateTip,
} from '@/lib/calculations'
import { cn } from '@/lib/utils'
import { TrendingDown, Wallet, PiggyBank, User } from 'lucide-react'
import AdBanner from '@/components/AdBanner'

type InputMode = 'monthly' | 'annual'

function ModeToggle({
  value,
  onChange,
}: {
  value: InputMode
  onChange: (v: InputMode) => void
}) {
  const { t } = useTranslation()
  return (
    <div className="inline-flex items-center bg-surface-100 rounded-lg p-0.5">
      <button
        className={cn(
          'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150',
          value === 'monthly'
            ? 'bg-white text-brand-600 shadow-sm'
            : 'text-ink-200 hover:text-ink-300'
        )}
        onClick={() => onChange('monthly')}
      >
        {t('common.monthly')}
      </button>
      <button
        className={cn(
          'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150',
          value === 'annual'
            ? 'bg-white text-brand-600 shadow-sm'
            : 'text-ink-200 hover:text-ink-300'
        )}
        onClick={() => onChange('annual')}
      >
        {t('common.annual')}
      </button>
    </div>
  )
}

function NumberInput({
  value,
  onChange,
  min = 0,
  max,
  step = 1000,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max: number
  step?: number
}) {
  const { getCurrencySymbol } = useCurrency()
  return (
    <div className="space-y-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex items-center gap-2">
        <span className="text-sm text-ink-200">{getCurrencySymbol()}</span>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const v = Math.max(min, Math.min(max, Number(e.target.value) || 0))
            onChange(v)
          }}
          className="input-field text-center font-display text-lg font-semibold tabular-nums"
        />
      </div>
    </div>
  )
}

export default function Finance() {
  const { t } = useTranslation()
  const { profile, setProfile } = useStore()
  const { formatCurrency } = useCurrency()

  const monthlyIncome = profile.annualIncome / 12
  const monthlyExpense = profile.annualExpense / 12
  const annualSavings = useMemo(() => calcAnnualSavings(profile), [profile])
  const savingsRate = useMemo(() => calcSavingsRate(profile), [profile])
  const rateTip = useMemo(() => getSavingsRateTip(savingsRate), [savingsRate])

  const incomeDisplayMax = profile.incomeMode === 'monthly' ? 200000 : 2000000
  const expenseDisplayMax = profile.expenseMode === 'monthly' ? 200000 : 2000000

  const handleIncomeChange = (displayValue: number) => {
    const annual = profile.incomeMode === 'monthly' ? displayValue * 12 : displayValue
    setProfile({ annualIncome: annual })
  }

  const handleExpenseChange = (displayValue: number) => {
    const annual = profile.expenseMode === 'monthly' ? displayValue * 12 : displayValue
    setProfile({ annualExpense: annual })
  }

  const expenseRatio = profile.annualIncome > 0 ? (profile.annualExpense / profile.annualIncome) * 100 : 0
  const savingsRatio = profile.annualIncome > 0 ? (annualSavings / profile.annualIncome) * 100 : 0

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="section-title text-2xl">{t('finance.title')}</h1>
        <p className="mt-1 text-sm text-ink-200">
          {t('finance.subtitle')}
        </p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Wallet size={16} className="text-brand-600" />
            </div>
            <span className="text-sm font-medium text-ink-500">{t('finance.income.title')}</span>
          </div>
          <ModeToggle
            value={profile.incomeMode}
            onChange={(mode) => setProfile({ incomeMode: mode })}
          />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="label-text">
            {profile.incomeMode === 'monthly' ? t('finance.income.monthlyIncome') : t('finance.income.annualIncome')}
          </span>
          <span className="text-lg font-semibold font-display text-brand-600">
            {formatCurrency(profile.incomeMode === 'monthly' ? monthlyIncome : profile.annualIncome)}
          </span>
        </div>
        <NumberInput
          value={Math.round(profile.incomeMode === 'monthly' ? monthlyIncome : profile.annualIncome)}
          onChange={handleIncomeChange}
          max={incomeDisplayMax}
          step={profile.incomeMode === 'monthly' ? 500 : 5000}
        />
        <p className="mt-3 text-xs text-ink-200 text-center">
          {t('finance.income.equivalentTo', { mode: profile.incomeMode === 'monthly' ? t('common.annual') : t('common.monthly') })}{' '}
          <span className="font-medium text-ink-300">
            {formatCurrency(profile.incomeMode === 'monthly' ? profile.annualIncome : monthlyIncome)}
          </span>
        </p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <TrendingDown size={16} className="text-danger" />
            </div>
            <span className="text-sm font-medium text-ink-500">{t('finance.expense.title')}</span>
          </div>
          <ModeToggle
            value={profile.expenseMode}
            onChange={(mode) => setProfile({ expenseMode: mode })}
          />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="label-text">
            {profile.expenseMode === 'monthly' ? t('finance.expense.monthlyExpense') : t('finance.expense.annualExpense')}
          </span>
          <span className="text-lg font-semibold font-display text-danger">
            {formatCurrency(profile.expenseMode === 'monthly' ? monthlyExpense : profile.annualExpense)}
          </span>
        </div>
        <NumberInput
          value={Math.round(profile.expenseMode === 'monthly' ? monthlyExpense : profile.annualExpense)}
          onChange={handleExpenseChange}
          max={expenseDisplayMax}
          step={profile.expenseMode === 'monthly' ? 500 : 5000}
        />
        <p className="mt-3 text-xs text-ink-200 text-center">
          {t('finance.expense.equivalentTo', { mode: profile.expenseMode === 'monthly' ? t('common.annual') : t('common.monthly') })}{' '}
          <span className="font-medium text-ink-300">
            {formatCurrency(profile.expenseMode === 'monthly' ? profile.annualExpense : monthlyExpense)}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center">
              <PiggyBank size={16} className="text-gold-500" />
            </div>
            <span className="text-sm font-medium text-ink-500">{t('finance.assets.title')}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="label-text">{t('finance.assets.totalAssets')}</span>
            <span className="text-lg font-semibold font-display text-gold-500">
              {formatCurrency(profile.currentAssets)}
            </span>
          </div>
          <NumberInput
            value={profile.currentAssets}
            onChange={(v) => setProfile({ currentAssets: v })}
            max={50000000}
            step={10000}
          />
          <p className="mt-3 text-xs text-ink-200 text-center">
            {t('finance.assets.description')}
          </p>
          <div className="mt-4 pt-4 border-t border-surface-200">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-ink-400">{t('finance.assets.ignoreExisting')}</span>
                <p className="text-xs text-ink-200 mt-0.5">{t('finance.assets.ignoreExistingDesc')}</p>
              </div>
              <div
                className={cn(
                  'relative w-11 h-6 rounded-full transition-colors duration-200',
                  profile.ignoreExistingAssets ? 'bg-brand-600' : 'bg-surface-300'
                )}
                onClick={() => setProfile({ ignoreExistingAssets: !profile.ignoreExistingAssets })}
              >
                <div
                  className={cn(
                    'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200',
                    profile.ignoreExistingAssets && 'translate-x-5'
                  )}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <User size={16} className="text-brand-600" />
            </div>
            <span className="text-sm font-medium text-ink-500">{t('finance.age.title')}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="label-text">{t('finance.age.currentAge')}</span>
            <span className="text-lg font-semibold font-display text-brand-600">
              {profile.age} {t('finance.age.yearsOld')}
            </span>
          </div>
          <input
            type="range"
            min={18}
            max={80}
            step={1}
            value={profile.age}
            onChange={(e) => setProfile({ age: Number(e.target.value) })}
            className="w-full mb-2"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={18}
              max={80}
              value={profile.age}
              onChange={(e) => setProfile({ age: Math.max(18, Math.min(80, Number(e.target.value))) })}
              className="input-field text-center font-display text-lg font-semibold w-24 mx-auto"
            />
          </div>
          <p className="mt-3 text-xs text-ink-200 text-center">
            {t('finance.age.description')}
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title text-lg mb-5">{t('finance.cashflow.title')}</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-ink-300">{t('finance.cashflow.annualIncome')}</span>
              <span className="font-semibold text-ink-500 font-display">
                {formatCurrency(profile.annualIncome)}
              </span>
            </div>
            <div className="h-4 bg-surface-100 rounded-full overflow-hidden flex">
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${expenseRatio}%`,
                  backgroundColor: '#E76F51',
                }}
              />
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${savingsRatio}%`,
                  backgroundColor: '#52B788',
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#E76F51' }} />
                <span className="text-ink-200">{t('finance.cashflow.expense')} {expenseRatio.toFixed(0)}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#52B788' }} />
                <span className="text-ink-200">{t('finance.cashflow.savings')} {savingsRatio.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-50 rounded-xl p-4 text-center">
            <p className="text-xs text-ink-200 mb-1">{t('finance.cashflow.annualSavings')}</p>
            <p className={cn(
              'text-xl font-semibold font-display',
              annualSavings >= 0 ? 'text-success' : 'text-danger'
            )}>
              {formatCurrency(annualSavings)}
            </p>
          </div>
          <div className="bg-surface-50 rounded-xl p-4 text-center">
            <p className="text-xs text-ink-200 mb-1">{t('finance.cashflow.monthlySavings')}</p>
            <p className={cn(
              'text-xl font-semibold font-display',
              annualSavings >= 0 ? 'text-success' : 'text-danger'
            )}>
              {formatCurrency(annualSavings / 12)}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title text-lg mb-5">{t('finance.savingsAnalysis.title')}</h2>
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="#E9ECEF"
                strokeWidth="8"
              />
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke={rateTip.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${Math.min(savingsRate, 100) * 2.64} 264`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-display" style={{ color: rateTip.color }}>
                {savingsRate.toFixed(0)}
              </span>
              <span className="text-[10px] text-ink-200">%{t('finance.savingsAnalysis.savingsRate')}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: rateTip.color }}
              >
                {t(`finance.savingsAnalysis.level.${rateTip.levelKey}`)}
              </span>
            </div>
            <p className="text-sm text-ink-300 leading-relaxed">
              {t(`finance.savingsAnalysis.tips.${rateTip.levelKey}`)}
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-surface-200">
          <div className="flex items-center gap-2 text-xs text-ink-200">
            <div className="flex-1 h-2 rounded-full overflow-hidden flex">
              {SAVINGS_RATE_TIPS.map((tip, i) => (
                <div
                  key={i}
                  className="h-full"
                  style={{
                    width: `${tip.max - tip.min}%`,
                    backgroundColor: tip.color,
                    opacity: savingsRate >= tip.min && savingsRate < tip.max ? 1 : 0.2,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-ink-200">
            <span>0%</span>
            <span>20%</span>
            <span>40%</span>
            <span>60%+</span>
          </div>
        </div>
      </div>

      <AdBanner slot="finance-bottom" />
    </div>
  )
}

const SAVINGS_RATE_TIPS = [
  { min: 0, max: 10, levelKey: 'dangerous', color: '#E76F51' },
  { min: 10, max: 20, levelKey: 'low', color: '#D4A843' },
  { min: 20, max: 30, levelKey: 'healthy', color: '#52B788' },
  { min: 30, max: 50, levelKey: 'excellent', color: '#2D6A4F' },
  { min: 50, max: 100, levelKey: 'outstanding', color: '#1B4332' },
]
