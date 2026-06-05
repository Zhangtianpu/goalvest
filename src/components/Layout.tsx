import { NavLink, useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import {
  Wallet,
  PieChart,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import LanguageSwitcher from './LanguageSwitcher'
import CurrencySwitcher from './CurrencySwitcher'
import { useStore } from '@/store/useStore'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const language = useStore((s) => s.language)
  const currency = useStore((s) => s.currency)
  const setCurrency = useStore((s) => s.setCurrency)

  // Auto-set currency based on language
  useEffect(() => {
    const defaultCurrency = language === 'en' ? 'USD' : 'CNY'
    if (currency !== defaultCurrency) {
      setCurrency(defaultCurrency)
    }
  }, [language, currency, setCurrency])

  const navItems = [
    { to: '/finance', label: t('nav.financialProfile'), icon: Wallet },
    { to: '/allocation', label: t('nav.assetAllocation'), icon: PieChart },
    { to: '/projection', label: t('nav.futureProjection'), icon: TrendingUp },
  ]

  const pageInfo: Record<string, { title: string; description: string }> = {
    '/finance': {
      title: t('seo.finance.title'),
      description: t('seo.finance.description'),
    },
    '/allocation': {
      title: t('seo.allocation.title'),
      description: t('seo.allocation.description'),
    },
    '/projection': {
      title: t('seo.projection.title'),
      description: t('seo.projection.description'),
    },
    '/privacy': {
      title: t('seo.privacy.title'),
      description: t('seo.privacy.description'),
    },
    '/terms': {
      title: t('seo.terms.title'),
      description: t('seo.terms.description'),
    },
    '/about': {
      title: t('seo.about.title'),
      description: t('seo.about.description'),
    },
  }

  const currentPage = pageInfo[location.pathname] || {
    title: t('seo.default.title'),
    description: t('seo.default.description'),
  }

  return (
    <div className="min-h-screen bg-surface-50 font-body">
      <Helmet>
        <title>{currentPage.title}</title>
        <meta name="description" content={currentPage.description} />
        <meta property="og:title" content={currentPage.title} />
        <meta property="og:description" content={currentPage.description} />
        <meta name="twitter:title" content={currentPage.title} />
        <meta name="twitter:description" content={currentPage.description} />
        <link rel="canonical" href={`https://goalvest.app${location.pathname}`} />
      </Helmet>

      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-brand-600 text-white">
        <Link to="/" className="flex items-center gap-3 px-6 py-6 border-b border-brand-500 hover:bg-brand-500/50 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-lg bg-gold-400 flex items-center justify-center">
            <span className="text-brand-600 font-display font-bold text-lg">G</span>
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold tracking-tight">Goalvest</h1>
            <p className="text-xs text-brand-200">{t('layout.appSubtitle')}</p>
          </div>
        </Link>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-brand-200 hover:bg-white/10 hover:text-white'
                )
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-brand-500">
          <LanguageSwitcher />
          <div className="mt-2">
            <CurrencySwitcher />
          </div>
          <div className="bg-brand-500/50 rounded-lg p-4 mt-3">
            <p className="text-xs text-brand-200 leading-relaxed">
              {t('layout.dataPrivacy')}
            </p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-surface-200 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">G</span>
              </div>
              <span className="font-display font-semibold text-ink-500">Goalvest</span>
            </Link>
            <div className="flex items-center gap-2">
              <CurrencySwitcher variant="light" />
              <LanguageSwitcher variant="light" />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="px-4 pb-3 space-y-1 animate-fade-in">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-ink-200 hover:bg-surface-100'
                    )
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}
        </header>

        <main className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto animate-fade-in" key={location.pathname}>
          {children}
          
          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-surface-200 text-center">
            <nav className="flex items-center justify-center gap-4 text-sm">
              <Link to="/about" className="text-ink-300 hover:text-brand-600 transition-colors">
                {t('footer.about')}
              </Link>
              <span className="text-surface-300">|</span>
              <Link to="/privacy" className="text-ink-300 hover:text-brand-600 transition-colors">
                {t('footer.privacy')}
              </Link>
              <span className="text-surface-300">|</span>
              <Link to="/terms" className="text-ink-300 hover:text-brand-600 transition-colors">
                {t('footer.terms')}
              </Link>
            </nav>
            <p className="mt-3 text-xs text-ink-200">
              © {new Date().getFullYear()} Goalvest. {t('footer.allRightsReserved')}
            </p>
          </footer>
        </main>
      </div>

      <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-surface-200 lg:hidden safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  isActive ? 'text-brand-600' : 'text-ink-200'
                )
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
