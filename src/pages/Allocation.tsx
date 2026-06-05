import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { calcAnnualSavings } from '@/lib/calculations'
import { cn } from '@/lib/utils'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Settings,
} from 'lucide-react'
import AdBanner from '@/components/AdBanner'

interface AssetClass {
  id: string
  icon: string
  color: string
  productsKey: string
}

const ASSET_CLASSES_CONFIG: AssetClass[] = [
  { id: 'cash', icon: '💵', color: '#52B788', productsKey: 'cash' },
  { id: 'fixed_income', icon: '📊', color: '#3B82F6', productsKey: 'fixed_income' },
  { id: 'index_fund', icon: '📈', color: '#D4A843', productsKey: 'index_fund' },
  { id: 'stock_fund', icon: '🎯', color: '#E76F51', productsKey: 'stock_fund' },
  { id: 'gold', icon: '🥇', color: '#F59E0B', productsKey: 'gold' },
  { id: 'insurance', icon: '🛡️', color: '#6366F1', productsKey: 'insurance' },
]

const PRESET_TEMPLATES_CONFIG = [
  {
    id: 'conservative',
    icon: '🛡️',
    allocations: { cash: 25, fixed_income: 45, index_fund: 10, gold: 10, stock_fund: 0, insurance: 10 },
  },
  {
    id: 'balanced',
    icon: '⚖️',
    allocations: { cash: 15, fixed_income: 30, index_fund: 35, gold: 5, stock_fund: 10, insurance: 5 },
  },
  {
    id: 'growth',
    icon: '🚀',
    allocations: { cash: 10, fixed_income: 15, index_fund: 45, gold: 5, stock_fund: 20, insurance: 5 },
  },
  {
    id: 'custom',
    icon: '⚙️',
    allocations: null,
  },
]

export default function Allocation() {
  const { t } = useTranslation()
  const profile = useStore((s) => s.profile)
  const allocation = useStore((s) => s.allocation)
  const setAllocation = useStore((s) => s.setAllocation)
  const assetReturns = useStore((s) => s.assetReturns)
  const setAssetReturns = useStore((s) => s.setAssetReturns)
  const { formatCurrency } = useCurrency()

  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [expandedAsset, setExpandedAsset] = useState<string | null>(null)
  const [showReturnSettings, setShowReturnSettings] = useState(false)
  const [showReturnFormula, setShowReturnFormula] = useState(false)

  // Create translated asset classes
  const ASSET_CLASSES = useMemo(() => ASSET_CLASSES_CONFIG.map(asset => ({
    ...asset,
    name: t(`allocation.assetClasses.${asset.id}.name`),
    description: t(`allocation.assetClasses.${asset.id}.description`),
    risk: t(`allocation.assetClasses.${asset.id}.risk`),
    return: t(`allocation.assetClasses.${asset.id}.return`),
    products: t(`allocation.assetClasses.${asset.id}.products`, { returnObjects: true }) as string[],
  })), [t])

  // Create translated preset templates
  const PRESET_TEMPLATES = useMemo(() => PRESET_TEMPLATES_CONFIG.map(template => ({
    ...template,
    name: t(`allocation.templates.${template.id}.name`),
    subtitle: t(`allocation.templates.${template.id}.subtitle`),
    description: t(`allocation.templates.${template.id}.description`),
  })), [t])

  useEffect(() => {
    const matchedTemplate = PRESET_TEMPLATES.find(template => {
      if (!template.allocations) return false
      return Object.entries(template.allocations).every(([key, value]) => {
        return allocation[key as keyof typeof allocation] === value
      })
    })
    setSelectedTemplate(matchedTemplate?.id || 'custom')
  }, [allocation, PRESET_TEMPLATES])

  const annualSavings = useMemo(() => calcAnnualSavings(profile), [profile])

  const currentAssetsAmounts = useMemo(() => {
    const amounts: Record<string, number> = {}
    ASSET_CLASSES.forEach((asset) => {
      amounts[asset.id] = profile.currentAssets * (allocation[asset.id as keyof typeof allocation] || 0) / 100
    })
    return amounts
  }, [allocation, profile.currentAssets])

  const totalAllocation = useMemo(() => {
    return Object.values(allocation).reduce((sum, v) => sum + v, 0)
  }, [allocation])

  const expectedReturn = useMemo(() => {
    let weighted = 0
    Object.entries(allocation).forEach(([id, percent]) => {
      weighted += (assetReturns[id as keyof typeof assetReturns] || 0) * percent / 100
    })
    return weighted
  }, [allocation, assetReturns])

  const assetAmounts = useMemo(() => {
    const amounts: Record<string, number> = {}
    ASSET_CLASSES.forEach((asset) => {
      amounts[asset.id] = annualSavings * (allocation[asset.id as keyof typeof allocation] || 0) / 100
    })
    return amounts
  }, [allocation, annualSavings])

  const pieData = useMemo(() => {
    return ASSET_CLASSES
      .filter((asset) => (allocation[asset.id as keyof typeof allocation] || 0) > 0)
      .map((asset) => ({
        name: asset.name,
        value: allocation[asset.id as keyof typeof allocation] || 0,
        amount: assetAmounts[asset.id] || 0,
        currentAssetAmount: currentAssetsAmounts[asset.id] || 0,
        totalAmount: (assetAmounts[asset.id] || 0) + (currentAssetsAmounts[asset.id] || 0),
        color: asset.color,
      }))
  }, [allocation, assetAmounts, currentAssetsAmounts])

  const handleTemplateSelect = (templateId: string) => {
    if (templateId === 'custom') return
    const template = PRESET_TEMPLATES.find(t => t.id === templateId)
    if (template && template.allocations) {
      setSelectedTemplate(templateId)
      setAllocation({ ...template.allocations } as any)
    }
  }

  const handleAllocationChange = (assetId: string, value: number) => {
    setAllocation({
      ...allocation,
      [assetId]: Math.max(0, Math.min(100, value)),
    } as any)
  }

  const validationIssues = useMemo(() => {
    const issues: string[] = []
    
    if (totalAllocation !== 100) {
      issues.push(t('allocation.validation.totalNot100', { total: totalAllocation }))
    }
    
    if ((allocation.cash || 0) < 10) {
      issues.push(t('allocation.validation.cashTooLow'))
    }
    
    return issues
  }, [totalAllocation, allocation, t])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in pb-24 lg:pb-8">
      <div>
        <h1 className="section-title text-2xl">{t('allocation.title')}</h1>
        <p className="mt-2 text-sm text-ink-200">
          {t('allocation.subtitle')}
        </p>
      </div>

      <div className="card bg-gradient-to-br from-brand-50 to-surface-50 border-brand-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-brand-700">{t('allocation.overview.title')}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-4">
          <div className="p-3 rounded-lg bg-white/60 border border-surface-200">
            <p className="text-xs text-ink-300">{t('allocation.overview.annualIncome')}</p>
            <p className="text-base font-semibold text-ink-500">{formatCurrency(profile.annualIncome)}</p>
          </div>
          <div className="p-3 rounded-lg bg-white/60 border border-surface-200">
            <p className="text-xs text-ink-300">{t('allocation.overview.annualExpense')}</p>
            <p className="text-base font-semibold text-ink-500">{formatCurrency(profile.annualExpense)}</p>
          </div>
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <p className="text-xs text-ink-300">{t('allocation.overview.annualSurplus')}</p>
            <p className="text-base font-semibold text-success">{formatCurrency(annualSavings)}</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-xs text-ink-300">{t('allocation.overview.existingAssets')}</p>
            <p className="text-base font-semibold text-blue-600">{formatCurrency(profile.currentAssets)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-white/60 border border-surface-200">
          <div className="text-center">
            <p className="text-xs text-ink-300">{t('allocation.overview.totalAssets')}</p>
            <p className="text-xl font-bold text-brand-600">{formatCurrency(profile.currentAssets + annualSavings)}</p>
            <p className="text-[10px] text-ink-200">{t('allocation.overview.existingPlusSurplus')}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-ink-300">{t('allocation.overview.existingAssetsReturn')}</p>
            <p className="text-xl font-bold text-success">{formatCurrency(profile.currentAssets * expectedReturn / 100)}</p>
            <p className="text-[10px] text-ink-200">{t('allocation.overview.atRate', { rate: expectedReturn.toFixed(1) })}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-ink-300">{t('allocation.overview.annualSurplusReturn')}</p>
            <p className="text-xl font-bold text-gold-500">{formatCurrency(annualSavings * expectedReturn / 100)}</p>
            <p className="text-[10px] text-ink-200">{t('allocation.overview.atRate', { rate: expectedReturn.toFixed(1) })}</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowReturnFormula(!showReturnFormula)}
          className="mt-3 text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          {showReturnFormula ? t('allocation.returnFormula.hide') : t('allocation.returnFormula.show')}
          {showReturnFormula ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        
        {showReturnFormula && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-surface-200 text-xs text-ink-400 space-y-2 animate-fade-in">
            <p className="font-medium text-ink-500">{t('allocation.returnFormula.title')}</p>
            <p className="text-ink-300 leading-relaxed">
              {t('allocation.returnFormula.formula')}
            </p>
            <div className="bg-surface-50 rounded p-2 mt-2 space-y-1">
              {ASSET_CLASSES.map(asset => {
                const percent = allocation[asset.id as keyof typeof allocation] || 0
                const rate = assetReturns[asset.id as keyof typeof assetReturns] || 0
                if (percent === 0) return null
                return (
                  <p key={asset.id} className="text-ink-200">
                    {asset.name}: {percent}% × {rate}% = <span className="text-ink-400">{(percent * rate / 100).toFixed(2)}%</span>
                  </p>
                )
              })}
            </div>
            <p className="text-ink-300 pt-2 border-t border-surface-200">
              {t('allocation.returnFormula.total')}<span className="font-medium text-brand-600">{expectedReturn.toFixed(2)}%</span>
            </p>
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-brand-600" />
            <h2 className="section-title text-lg">{t('allocation.returnSettings.title')}</h2>
          </div>
          <button
            onClick={() => setShowReturnSettings(!showReturnSettings)}
            className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            {showReturnSettings ? t('allocation.returnSettings.hide') : t('allocation.returnSettings.adjust')}
            {showReturnSettings ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
        
        {!showReturnSettings && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {ASSET_CLASSES.map(asset => (
              <div key={asset.id} className="text-center p-2 bg-surface-50 rounded-lg">
                <p className="text-[10px] text-ink-200">{asset.name}</p>
                <p className="text-sm font-semibold" style={{ color: asset.color }}>
                  {assetReturns[asset.id as keyof typeof assetReturns]}%
                </p>
              </div>
            ))}
          </div>
        )}
        
        {showReturnSettings && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-ink-300">
              {t('allocation.returnSettings.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ASSET_CLASSES.map(asset => (
                <div key={asset.id} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ backgroundColor: asset.color + '18' }}
                  >
                    {asset.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-ink-300 truncate">{asset.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={0}
                        max={30}
                        step={0.5}
                        value={assetReturns[asset.id as keyof typeof assetReturns]}
                        onChange={(e) => setAssetReturns({
                          ...assetReturns,
                          [asset.id]: Number(e.target.value),
                        } as any)}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          step={0.5}
                          value={assetReturns[asset.id as keyof typeof assetReturns]}
                          onChange={(e) => {
                            const v = Math.max(0, Math.min(100, Number(e.target.value) || 0))
                            setAssetReturns({
                              ...assetReturns,
                              [asset.id]: v,
                            } as any)
                          }}
                          className="input-field w-16 text-center text-sm py-1"
                        />
                        <span className="text-xs text-ink-200">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-brand-600" />
          <h2 className="section-title text-lg">{t('allocation.templates.title')}</h2>
        </div>
        <p className="text-sm text-ink-300 mb-4">
          {t('allocation.templates.subtitle')}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PRESET_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={cn(
                'p-4 rounded-xl border text-left transition-all',
                selectedTemplate === template.id
                  ? 'border-brand-400 bg-brand-50 ring-2 ring-brand-200'
                  : 'border-surface-200 hover:border-brand-200 hover:bg-surface-50'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{template.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-ink-500">{template.name}</p>
                  <p className="text-xs text-ink-300">{template.subtitle}</p>
                </div>
              </div>
              <p className="text-xs text-ink-300 mb-2">{template.description}</p>
              {template.id !== 'custom' && (
                <div className="flex items-center gap-1 text-[10px] text-ink-200">
                  <span>{t('allocation.templates.risk')}</span>
                  {template.id === 'conservative' && <span className="text-blue-500">{t('allocation.templates.riskLow')}</span>}
                  {template.id === 'balanced' && <span className="text-gold-500">{t('allocation.templates.riskMedium')}</span>}
                  {template.id === 'growth' && <span className="text-red-500">{t('allocation.templates.riskHigh')}</span>}
                </div>
              )}
              {template.id === 'custom' && selectedTemplate === 'custom' && (
                <div className="flex items-center gap-1 text-[10px] text-brand-600">
                  <span>{t('allocation.templates.custom.currentCustom')}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title text-lg">{t('allocation.details.title')}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-ink-300">{t('allocation.details.totalAllocation')}</span>
            <span className={cn(
              'text-lg font-bold font-display',
              totalAllocation === 100 ? 'text-success' : 'text-danger'
            )}>
              {totalAllocation}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            {ASSET_CLASSES.map((asset) => {
              const assetAllocation = allocation[asset.id as keyof typeof allocation] || 0
              const annualAmount = assetAmounts[asset.id] || 0
              const currentAssetAmount = currentAssetsAmounts[asset.id] || 0
              const totalAmount = annualAmount + currentAssetAmount
              const isExpanded = expandedAsset === asset.id
              
              return (
                <div key={asset.id} className="bg-surface-50 rounded-lg border border-surface-200">
                  <div
                    className="p-3 cursor-pointer"
                    onClick={() => setExpandedAsset(isExpanded ? null : asset.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                        style={{ backgroundColor: asset.color + '18' }}
                      >
                        {asset.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-ink-500">{asset.name}</span>
                          <span className="text-sm font-semibold" style={{ color: asset.color }}>
                            {assetAllocation}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-surface-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{ width: `${assetAllocation}%`, backgroundColor: asset.color }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-ink-400">{formatCurrency(totalAmount)}</p>
                        <p className="text-[10px] text-ink-200">{t('allocation.details.currentPlusAnnual', { current: formatCurrency(currentAssetAmount), annual: formatCurrency(annualAmount) })}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-ink-300" />
                      ) : (
                        <ChevronDown size={16} className="text-ink-300" />
                      )}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="px-3 pb-3 pt-2 border-t border-surface-200 animate-fade-in">
                      <p className="text-xs text-ink-300 mb-3">{asset.description}</p>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-ink-200">{t('allocation.details.allocationRatio')}</span>
                          <span className="text-xs text-ink-200">{t('allocation.details.risk')}{asset.risk}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={5}
                          value={assetAllocation}
                          onChange={(e) => handleAllocationChange(asset.id, Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            step={5}
                            value={assetAllocation}
                            onChange={(e) => handleAllocationChange(asset.id, Number(e.target.value))}
                            className="input-field w-20 text-center text-sm"
                          />
                          <span className="text-xs text-ink-200">%</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-surface-200">
                        <p className="text-xs text-ink-200 mb-1">{t('allocation.details.recommendedProducts')}</p>
                        <div className="flex flex-wrap gap-1">
                          {asset.products.map((product) => (
                            <span
                              key={product}
                              className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border"
                              style={{
                                backgroundColor: asset.color + '10',
                                color: asset.color,
                                borderColor: asset.color + '30',
                              }}
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="space-y-4">
            <div className="bg-surface-50 rounded-xl p-4 border border-surface-200">
              <h3 className="text-sm font-medium text-ink-400 mb-3">{t('allocation.distribution.title')}</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E9ECEF',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 mt-3">
                {pieData.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
                      <span className="text-ink-300">{entry.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-ink-400">{entry.value}%</span>
                      <span className="text-ink-200">{formatCurrency(entry.totalAmount)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-surface-200 text-xs text-ink-200">
                <p>{t('allocation.distribution.amount')}</p>
              </div>
            </div>

            <div className="bg-surface-50 rounded-xl p-4 border border-surface-200">
              <h3 className="text-sm font-medium text-ink-400 mb-3">{t('allocation.expectedReturn.title')}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-300">{t('allocation.expectedReturn.annualizedReturn')}</span>
                  <span className="text-xl font-bold text-brand-600">{expectedReturn.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-300">{t('allocation.expectedReturn.existingAssetsReturn')}</span>
                  <span className="text-lg font-semibold text-success">
                    {formatCurrency(profile.currentAssets * expectedReturn / 100)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-300">{t('allocation.expectedReturn.annualSurplusReturn')}</span>
                  <span className="text-lg font-semibold text-gold-500">
                    {formatCurrency(annualSavings * expectedReturn / 100)}
                  </span>
                </div>
                <div className="pt-3 border-t border-surface-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink-400">{t('allocation.expectedReturn.totalAnnualReturn')}</span>
                    <span className="text-xl font-bold text-brand-600">
                      {formatCurrency((profile.currentAssets + annualSavings) * expectedReturn / 100)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {validationIssues.length > 0 && (
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={14} className="text-danger" />
                  <span className="text-sm font-medium text-danger">{t('allocation.validation.title')}</span>
                </div>
                <ul className="space-y-1">
                  {validationIssues.map((issue, i) => (
                    <li key={i} className="text-xs text-ink-300">• {issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {validationIssues.length === 0 && totalAllocation === 100 && (
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-success" />
                  <span className="text-sm font-medium text-success">{t('allocation.validation.valid')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-surface-50 border-surface-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
            <Info size={18} className="text-brand-600" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-ink-500 mb-2">{t('allocation.suggestions.title')}</h3>
            <ul className="text-sm text-ink-400 space-y-1.5">
              <li>• {t('allocation.suggestions.cashLiquidity')}</li>
              <li>• {t('allocation.suggestions.ageRule')}</li>
              <li>• {t('allocation.suggestions.rebalance')}</li>
              <li>• {t('allocation.suggestions.longTerm')}</li>
            </ul>
          </div>
        </div>
      </div>

      <AdBanner slot="allocation-bottom" />
    </div>
  )
}
