import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { calcAnnualSavings } from '@/lib/calculations'
import { cn } from '@/lib/utils'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Info,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import AdBanner from '@/components/AdBanner'

interface YearlyProjection {
  year: number
  age: number
  fixedStart: number
  fixedEnd: number
  fixedReturn: number
  equityStart: number
  equityEnd: number
  equityReturn: number
  totalStart: number
  totalEnd: number
  totalReturn: number
  newInvestment: number
}

function calculateProjections(
  startFixed: number,
  startEquity: number,
  annualFixedInvestment: number,
  annualEquityInvestment: number,
  years: number,
  startAge: number,
  fixedRate: number,
  equityRate: number,
  isCompound: boolean
): YearlyProjection[] {
  const projections: YearlyProjection[] = []
  let currentFixed = startFixed
  let currentEquity = startEquity
  
  let simpleFixedPrincipal = startFixed
  let simpleEquityPrincipal = startEquity
  let simpleFixedAccumReturn = 0
  let simpleEquityAccumReturn = 0

  for (let i = 0; i < years; i++) {
    let fixedStart: number
    let equityStart: number
    let fixedReturn: number
    let equityReturn: number
    let fixedEnd: number
    let equityEnd: number

    if (isCompound) {
      fixedStart = currentFixed
      equityStart = currentEquity
      fixedReturn = currentFixed * fixedRate
      equityReturn = currentEquity * equityRate
      currentFixed = currentFixed + fixedReturn + annualFixedInvestment
      currentEquity = currentEquity + equityReturn + annualEquityInvestment
      fixedEnd = currentFixed
      equityEnd = currentEquity
    } else {
      fixedStart = simpleFixedPrincipal
      equityStart = simpleEquityPrincipal
      fixedReturn = simpleFixedPrincipal * fixedRate
      equityReturn = simpleEquityPrincipal * equityRate
      simpleFixedAccumReturn += fixedReturn
      simpleEquityAccumReturn += equityReturn
      fixedEnd = simpleFixedPrincipal + simpleFixedAccumReturn
      equityEnd = simpleEquityPrincipal + simpleEquityAccumReturn
      simpleFixedPrincipal += annualFixedInvestment
      simpleEquityPrincipal += annualEquityInvestment
    }

    projections.push({
      year: new Date().getFullYear() + i + 1,
      age: startAge + i + 1,
      fixedStart,
      fixedEnd,
      fixedReturn,
      equityStart,
      equityEnd,
      equityReturn,
      totalStart: fixedStart + equityStart,
      totalEnd: fixedEnd + equityEnd,
      totalReturn: fixedReturn + equityReturn,
      newInvestment: annualFixedInvestment + annualEquityInvestment,
    })
  }

  return projections
}

export default function Projection() {
  const { t } = useTranslation()
  const profile = useStore((s) => s.profile)
  const allocation = useStore((s) => s.allocation)
  const assetReturns = useStore((s) => s.assetReturns)
  const { formatCurrency } = useCurrency()

  const [showDetails, setShowDetails] = useState(false)
  const [projectionYears, setProjectionYears] = useState(20)
  const [isCompound, setIsCompound] = useState(true)
  const [showRateDetail, setShowRateDetail] = useState(false)

  const annualSavings = useMemo(() => calcAnnualSavings(profile), [profile])

  const fixedRatio = useMemo(() => {
    return (allocation.cash + allocation.fixed_income + allocation.insurance) / 100
  }, [allocation])

  const equityRatio = useMemo(() => {
    return (allocation.index_fund + allocation.stock_fund + allocation.gold) / 100
  }, [allocation])

  const fixedRate = useMemo(() => {
    const total = allocation.cash + allocation.fixed_income + allocation.insurance
    if (total === 0) return 3.5
    return (allocation.cash * assetReturns.cash + allocation.fixed_income * assetReturns.fixed_income + allocation.insurance * assetReturns.insurance) / total
  }, [allocation, assetReturns])

  const equityRate = useMemo(() => {
    const total = allocation.index_fund + allocation.stock_fund + allocation.gold
    if (total === 0) return 8.0
    return (allocation.index_fund * assetReturns.index_fund + allocation.stock_fund * assetReturns.stock_fund + allocation.gold * assetReturns.gold) / total
  }, [allocation, assetReturns])

  const monthlyExpense = profile.annualExpense / 12
  const emergencyFund = monthlyExpense * 6
  const investableAssets = profile.ignoreExistingAssets ? 0 : Math.max(0, profile.currentAssets - emergencyFund)

  const startFixed = investableAssets * fixedRatio
  const startEquity = investableAssets * equityRatio
  const annualFixedInvestment = annualSavings * fixedRatio
  const annualEquityInvestment = annualSavings * equityRatio

  const projections = useMemo(
    () =>
      calculateProjections(
        startFixed,
        startEquity,
        annualFixedInvestment,
        annualEquityInvestment,
        projectionYears,
        profile.age,
        fixedRate / 100,
        equityRate / 100,
        isCompound
      ),
    [startFixed, startEquity, annualFixedInvestment, annualEquityInvestment, projectionYears, profile.age, fixedRate, equityRate, isCompound]
  )

  const chartData = useMemo(
    () =>
      projections.map((p) => ({
        year: `${p.year}${t('common.year')}`,
        age: p.age,
        [t('projection.chart.fixedIncome')]: Math.round(p.fixedEnd / 10000),
        [t('projection.chart.equity')]: Math.round(p.equityEnd / 10000),
        [t('projection.chart.totalAssets')]: Math.round(p.totalEnd / 10000),
      })),
    [projections, t]
  )

  const finalProjection = projections[projections.length - 1]
  const totalInvestment = startFixed + startEquity + (annualFixedInvestment + annualEquityInvestment) * projectionYears
  const totalReturn = finalProjection.totalEnd - totalInvestment

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in pb-24 lg:pb-8">
      <div>
        <h1 className="section-title text-2xl">{t('projection.title')}</h1>
        <p className="mt-2 text-sm text-ink-200 leading-relaxed">
          {t('projection.subtitle')}
        </p>
      </div>

      <div className="card bg-gradient-to-br from-brand-50 to-surface-50 border-brand-100">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-brand-600" />
          <span className="text-sm font-medium text-brand-700">{t('projection.config.title')}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-3 border border-surface-200">
            <p className="text-xs text-ink-200 mb-1">{t('projection.config.fixedIncome')}</p>
            <p className="text-lg font-bold font-display" style={{ color: '#D4A843' }}>
              {(fixedRatio * 100).toFixed(0)}%
            </p>
            <p className="text-[10px] text-ink-200">{t('projection.config.fixedIncomeDesc')}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-surface-200">
            <p className="text-xs text-ink-200 mb-1">{t('projection.config.equity')}</p>
            <p className="text-lg font-bold font-display" style={{ color: '#E76F51' }}>
              {(equityRatio * 100).toFixed(0)}%
            </p>
            <p className="text-[10px] text-ink-200">{t('projection.config.equityDesc')}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-surface-200">
            <p className="text-xs text-ink-200 mb-1">{t('projection.config.fixedIncomeRate')}</p>
            <p className="text-lg font-bold font-display" style={{ color: '#D4A843' }}>
              {fixedRate.toFixed(1)}%
            </p>
            <p className="text-[10px] text-ink-200">{t('projection.config.weightedAverage')}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-surface-200">
            <p className="text-xs text-ink-200 mb-1">{t('projection.config.equityRate')}</p>
            <p className="text-lg font-bold font-display" style={{ color: '#E76F51' }}>
              {equityRate.toFixed(1)}%
            </p>
            <p className="text-[10px] text-ink-200">{t('projection.config.weightedAverage')}</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowRateDetail(!showRateDetail)}
          className="mt-3 text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          {showRateDetail ? t('projection.rateFormula.hide') : t('projection.rateFormula.show')}
          {showRateDetail ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        
        {showRateDetail && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-surface-200 text-xs text-ink-400 space-y-3 animate-fade-in">
            <div>
              <p className="font-medium text-ink-500 mb-1">{t('projection.rateFormula.fixedIncomeTitle')}</p>
              <p className="text-ink-300 leading-relaxed">
                {t('projection.rateFormula.fixedIncomeFormula')}
              </p>
              <p className="text-ink-200 mt-1">
                {t('projection.details.current')}：({allocation.cash}% × {assetReturns.cash}% + {allocation.fixed_income}% × {assetReturns.fixed_income}% + {allocation.insurance}% × {assetReturns.insurance}%) ÷ {(fixedRatio * 100).toFixed(0)}% = <span className="font-medium text-ink-400">{fixedRate.toFixed(1)}%</span>
              </p>
            </div>
            <div>
              <p className="font-medium text-ink-500 mb-1">{t('projection.rateFormula.equityTitle')}</p>
              <p className="text-ink-300 leading-relaxed">
                {t('projection.rateFormula.equityFormula')}
              </p>
              <p className="text-ink-200 mt-1">
                {t('projection.details.current')}：({allocation.index_fund}% × {assetReturns.index_fund}% + {allocation.stock_fund}% × {assetReturns.stock_fund}% + {allocation.gold}% × {assetReturns.gold}%) ÷ {(equityRatio * 100).toFixed(0)}% = <span className="font-medium text-ink-400">{equityRate.toFixed(1)}%</span>
              </p>
            </div>
            <div className="pt-2 border-t border-surface-200">
              <p className="text-ink-200">
                <span className="text-ink-300">{t('projection.rateFormula.expectedAnnualReturn')}</span>{t('projection.rateFormula.formula')}<span className="font-medium text-gold-500">{(fixedRate * fixedRatio + equityRate * equityRatio).toFixed(1)}%</span>
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-3 bg-gold-50 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-ink-300 leading-relaxed">
            {t('projection.warning')}
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title text-lg mb-4">{t('projection.settings.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-ink-400">{t('projection.settings.interestMode')}</span>
            </div>
            <div className="flex items-center gap-2 p-1 bg-surface-100 rounded-lg">
              <button
                onClick={() => setIsCompound(true)}
                className={cn(
                  'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
                  isCompound
                    ? 'bg-white text-brand-600 shadow-sm'
                    : 'text-ink-200 hover:text-ink-300'
                )}
              >
                {t('projection.settings.compound')}
              </button>
              <button
                onClick={() => setIsCompound(false)}
                className={cn(
                  'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
                  !isCompound
                    ? 'bg-white text-brand-600 shadow-sm'
                    : 'text-ink-200 hover:text-ink-300'
                )}
              >
                {t('projection.settings.simple')}
              </button>
            </div>
            <p className="text-xs text-ink-200 mt-2">
              {isCompound
                ? t('projection.settings.compoundDesc')
                : t('projection.settings.simpleDesc')}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-ink-400">{t('projection.settings.projectionYears')}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={projectionYears}
                onChange={(e) => setProjectionYears(Number(e.target.value))}
                className="flex-1"
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={projectionYears}
                  onChange={(e) => {
                    const v = Math.max(1, Math.min(50, Number(e.target.value) || 1))
                    setProjectionYears(v)
                  }}
                  className="input-field text-center font-display text-sm font-semibold w-16"
                />
                <span className="text-sm text-ink-300">{t('projection.settings.yearsUnit')}</span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-ink-200 mt-1">
              <span>1{t('common.year')}</span>
              <span>25{t('common.years')}</span>
              <span>50{t('common.years')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title text-lg mb-5">{t('projection.chart.title')}</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="#ADB5BD" />
              <YAxis
                tickFormatter={(v) => t('projection.chart.unit', { value: v })}
                tick={{ fontSize: 10 }}
                stroke="#ADB5BD"
              />
              <Tooltip
                formatter={(value: number, name: string) => [t('projection.chart.unit', { value }), name]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E9ECEF',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey={t('projection.chart.fixedIncome')}
                stackId="1"
                stroke="#D4A843"
                fill="#D4A843"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey={t('projection.chart.equity')}
                stackId="1"
                stroke="#E76F51"
                fill="#E76F51"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-xs text-ink-200 mb-2">{t('projection.summary.initialInvestment')}</p>
          <p className="text-2xl font-bold font-display text-ink-500">
            {formatCurrency(startFixed + startEquity)}
          </p>
          <p className="text-[10px] text-ink-200 mt-1">{t('projection.summary.initialInvestmentDesc')}</p>
        </div>
        <div className="card text-center">
          <p className="text-xs text-ink-200 mb-2">{t('projection.summary.annualAddition')}</p>
          <p className="text-2xl font-bold font-display text-brand-600">
            {formatCurrency(annualFixedInvestment + annualEquityInvestment)}
          </p>
          <p className="text-[10px] text-ink-200 mt-1">{t('projection.summary.annualAdditionDesc', { fixed: formatCurrency(annualFixedInvestment), equity: formatCurrency(annualEquityInvestment) })}</p>
        </div>
        <div className="card text-center bg-brand-50 border-brand-100">
          <p className="text-xs text-ink-200 mb-2">{t('projection.summary.projectionYears', { years: projectionYears })}</p>
          <p className="text-2xl font-bold font-display text-brand-600">
            {formatCurrency(finalProjection.totalEnd)}
          </p>
          <p className="text-[10px] text-ink-200 mt-1">
            {t('projection.summary.investmentReturn')} {formatCurrency(totalReturn)}
          </p>
        </div>
      </div>

      <div className="card">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between"
        >
          <h2 className="section-title text-lg">{t('projection.details.title')}</h2>
          {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showDetails && (
          <div className="mt-5 animate-fade-in">
            <div className="mb-4 p-3 bg-surface-50 rounded-lg border border-surface-200">
              <p className="text-xs font-medium text-ink-400 mb-2">{t('projection.details.calculationNote')}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] text-ink-300">
                <div><span className="text-ink-400">{t('projection.details.yearStartFixed')}</span>{t('projection.details.lastYearEndFixed')}</div>
                <div><span className="text-ink-400">{t('projection.details.fixedReturn')}</span>{t('projection.details.yearStartFixedShort')} × {fixedRate.toFixed(1)}%</div>
                <div><span className="text-ink-400">{t('projection.details.yearStartEquity')}</span>{t('projection.details.lastYearEndEquity')}</div>
                <div><span className="text-ink-400">{t('projection.details.equityReturn')}</span>{t('projection.details.yearStartEquityShort')} × {equityRate.toFixed(1)}%</div>
                <div><span className="text-ink-400">{t('projection.details.yearEndTotal')}</span>{t('projection.details.yearStart')} + {t('projection.details.return')} + {t('projection.details.newAddition')}</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-200">
                    <th className="text-left py-3 px-2 text-xs font-medium text-ink-200">{t('projection.details.year')}</th>
                    <th className="text-left py-3 px-2 text-xs font-medium text-ink-200">{t('projection.details.age')}</th>
                    <th className="text-right py-3 px-2 text-xs font-medium text-ink-200">{t('projection.details.yearStartFixedShort')}</th>
                    <th className="text-right py-3 px-2 text-xs font-medium text-ink-200">{t('projection.details.fixedReturnShort')}</th>
                    <th className="text-right py-3 px-2 text-xs font-medium text-ink-200">{t('projection.details.yearStartEquityShort')}</th>
                    <th className="text-right py-3 px-2 text-xs font-medium text-ink-200">{t('projection.details.equityReturnShort')}</th>
                    <th className="text-right py-3 px-2 text-xs font-medium text-ink-200">{t('projection.details.yearEndTotalShort')}</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.map((p, i) => (
                    <tr key={i} className="border-b border-surface-100 hover:bg-surface-50">
                      <td className="py-3 px-2 text-ink-400">{p.year}{t('common.year')}</td>
                      <td className="py-3 px-2 text-ink-300">{p.age}{t('finance.age.yearsOld')}</td>
                      <td className="py-3 px-2 text-right font-display" style={{ color: '#D4A843' }}>
                        {formatCurrency(p.fixedStart)}
                      </td>
                      <td className="py-3 px-2 text-right text-xs" style={{ color: '#D4A843' }}>
                        +{formatCurrency(p.fixedReturn)}
                      </td>
                      <td className="py-3 px-2 text-right font-display" style={{ color: '#E76F51' }}>
                        {formatCurrency(p.equityStart)}
                      </td>
                      <td className="py-3 px-2 text-right text-xs" style={{ color: '#E76F51' }}>
                        +{formatCurrency(p.equityReturn)}
                      </td>
                      <td className="py-3 px-2 text-right font-semibold font-display text-brand-600">
                        {formatCurrency(p.totalEnd)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="section-title text-lg mb-5">{t('projection.analysis.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-ink-400 mb-3">{t('projection.analysis.principalVsReturn')}</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { name: t('projection.analysis.initial'), [t('projection.analysis.principal')]: startFixed + startEquity, [t('projection.analysis.return')]: 0 },
                    ...projections.filter((_, i) => i % 5 === 4 || i === projections.length - 1).map((p) => ({
                      name: `${p.year}${t('common.year')}`,
                      [t('projection.analysis.principal')]: totalInvestment / projectionYears * (projections.indexOf(p) + 1),
                      [t('projection.analysis.return')]: p.totalEnd - totalInvestment / projectionYears * (projections.indexOf(p) + 1),
                    })),
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#ADB5BD" />
                  <YAxis tickFormatter={(v) => t('projection.chart.unit', { value: Math.round(v / 10000) })} tick={{ fontSize: 10 }} stroke="#ADB5BD" />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Area type="monotone" dataKey={t('projection.analysis.principal')} stackId="1" stroke="#52B788" fill="#52B788" fillOpacity={0.6} />
                  <Area type="monotone" dataKey={t('projection.analysis.return')} stackId="1" stroke="#D4A843" fill="#D4A843" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-ink-400 mb-3">{t('projection.analysis.afterYears', { years: projectionYears })}</h3>
            <div className="space-y-4">
              <div className="bg-surface-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-ink-400">{t('projection.analysis.principalInvested')}</span>
                  <span className="font-semibold font-display text-ink-500">{formatCurrency(totalInvestment)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-400">{t('projection.analysis.investmentReturn')}</span>
                  <span className="font-semibold font-display text-brand-600">+{formatCurrency(totalReturn)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-3" style={{ backgroundColor: '#D4A84310' }}>
                  <p className="text-xs text-ink-200 mb-1">{t('projection.analysis.fixedIncome')}</p>
                  <p className="text-lg font-bold font-display" style={{ color: '#D4A843' }}>
                    {formatCurrency(finalProjection.fixedEnd)}
                  </p>
                  <p className="text-[10px] text-ink-200">
                    {t('projection.analysis.proportion')} {Math.round((finalProjection.fixedEnd / finalProjection.totalEnd) * 100)}%
                  </p>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: '#E76F5110' }}>
                  <p className="text-xs text-ink-200 mb-1">{t('projection.analysis.equityInvestment')}</p>
                  <p className="text-lg font-bold font-display" style={{ color: '#E76F51' }}>
                    {formatCurrency(finalProjection.equityEnd)}
                  </p>
                  <p className="text-[10px] text-ink-200">
                    {t('projection.analysis.proportion')} {Math.round((finalProjection.equityEnd / finalProjection.totalEnd) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-gold-50 border-gold-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-400 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">💡</span>
          </div>
          <div>
            <h3 className="font-display font-semibold text-gold-600 mb-2">{t('projection.advice.title')}</h3>
            <ul className="text-sm text-ink-400 space-y-1.5">
              <li>• {t('projection.advice.fixedStability')}</li>
              <li>• {t('projection.advice.equityLongTerm')}</li>
              <li>• {t('projection.advice.ageAdjustment')}</li>
              <li>• {t('projection.advice.annualReview')}</li>
            </ul>
          </div>
        </div>
      </div>

      <AdBanner slot="projection-bottom" />
    </div>
  )
}
