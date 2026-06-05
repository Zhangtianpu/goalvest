import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'
import { Globe, ChevronDown } from 'lucide-react'

interface LanguageSwitcherProps {
  variant?: 'dark' | 'light'
}

export default function LanguageSwitcher({ variant = 'dark' }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation()
  const { language, setLanguage } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 同步 i18n 语言和 store
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language, i18n])

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (lang: 'en' | 'zh') => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
    setIsOpen(false)
  }

  const languageOptions = [
    { code: 'en' as const, label: t('common.english'), shortLabel: 'EN' },
    { code: 'zh' as const, label: t('common.chinese'), shortLabel: '中文' },
  ]

  const currentLang = languageOptions.find((opt) => opt.code === language) || languageOptions[0]

  const isDark = variant === 'dark'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
          'focus:outline-none focus:ring-2',
          isDark
            ? 'hover:bg-white/10 focus:ring-white/20 text-white'
            : 'hover:bg-surface-100 focus:ring-brand-200 text-ink-300'
        )}
      >
        <Globe size={16} />
        <span>{currentLang.shortLabel}</span>
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-150', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute min-w-[140px]',
            isDark ? 'bottom-full mb-2 left-0' : 'top-full mt-2 right-0',
            'bg-white rounded-lg shadow-lg border border-surface-200',
            'animate-fade-in overflow-hidden'
          )}
        >
          <div className="py-1">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => handleLanguageChange(option.code)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors',
                  language === option.code
                    ? 'bg-brand-50 text-brand-600 font-medium'
                    : 'text-ink-300 hover:bg-surface-50 hover:text-ink-500'
                )}
              >
                <span
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold',
                    language === option.code
                      ? 'bg-brand-600 text-white'
                      : 'bg-surface-100 text-ink-200'
                  )}
                >
                  {option.code === 'en' ? 'E' : '中'}
                </span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
