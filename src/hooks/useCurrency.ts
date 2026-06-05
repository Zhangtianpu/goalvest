import { useStore } from '@/store/useStore'
import type { Currency } from '@/store/types'

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  CNY: '¥',
}

const CURRENCY_NAMES: Record<Currency, Record<'en' | 'zh', string>> = {
  USD: { en: 'US Dollar', zh: '美元' },
  CNY: { en: 'Chinese Yuan', zh: '人民币' },
}

function formatNumber(num: number): string {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + '亿'
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + '万'
  }
  return num.toLocaleString('zh-CN', { maximumFractionDigits: 0 })
}

function formatNumberEn(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K'
  }
  return num.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

export function useCurrency() {
  const currency = useStore((state) => state.currency)
  const language = useStore((state) => state.language)
  const setCurrency = useStore((state) => state.setCurrency)

  const formatCurrency = (num: number): string => {
    const symbol = CURRENCY_SYMBOLS[currency]
    const formatted = language === 'en' ? formatNumberEn(num) : formatNumber(num)
    return symbol + formatted
  }

  const formatCurrencyWithUnit = (num: number): string => {
    const symbol = CURRENCY_SYMBOLS[currency]
    const formatted = language === 'en' ? formatNumberEn(num) : formatNumber(num)
    return `${symbol}${formatted} ${CURRENCY_NAMES[currency][language]}`
  }

  const getCurrencyName = (): string => {
    return CURRENCY_NAMES[currency][language]
  }

  const getCurrencySymbol = (): string => {
    return CURRENCY_SYMBOLS[currency]
  }

  return {
    currency,
    language,
    setCurrency,
    formatCurrency,
    formatCurrencyWithUnit,
    getCurrencyName,
    getCurrencySymbol,
    CURRENCY_SYMBOLS,
    CURRENCY_NAMES,
  }
}
