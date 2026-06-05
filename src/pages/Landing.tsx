import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Wallet,
  PieChart,
  TrendingUp,
  Shield,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Calculator,
  Target
} from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Landing() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-gold-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold text-ink-500">Goalvest</h1>
              </div>
            </div>
            <LanguageSwitcher variant="light" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-6">
            <Sparkles size={16} />
            {t('landing.hero.badge')}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-ink-500 leading-tight mb-6">
            {t('landing.hero.title')}
          </h1>

          <p className="text-lg sm:text-xl text-ink-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('landing.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/finance')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 text-white rounded-xl font-semibold text-lg hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/25"
            >
              {t('landing.hero.getStarted')}
              <ArrowRight size={20} />
            </button>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ink-500 rounded-xl font-semibold text-lg hover:bg-surface-50 transition-colors border border-surface-200"
            >
              {t('landing.hero.learnMore')}
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-600 font-display">100%</p>
              <p className="text-sm text-ink-300 mt-1">{t('landing.stats.free')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-600 font-display">0</p>
              <p className="text-sm text-ink-300 mt-1">{t('landing.stats.noUpload')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-600 font-display">3</p>
              <p className="text-sm text-ink-300 mt-1">{t('landing.stats.tools')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-500 mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-lg text-ink-300 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-surface-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center mb-6">
                <BarChart3 className="text-brand-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-ink-500 mb-3">
                {t('landing.features.financial.title')}
              </h3>
              <p className="text-ink-300 leading-relaxed">
                {t('landing.features.financial.description')}
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-success" />
                  {t('landing.features.financial.item1')}
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-success" />
                  {t('landing.features.financial.item2')}
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-success" />
                  {t('landing.features.financial.item3')}
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gold-100 flex items-center justify-center mb-6">
                <PieChart className="text-gold-500" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-ink-500 mb-3">
                {t('landing.features.allocation.title')}
              </h3>
              <p className="text-ink-300 leading-relaxed">
                {t('landing.features.allocation.description')}
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-success" />
                  {t('landing.features.allocation.item1')}
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-success" />
                  {t('landing.features.allocation.item2')}
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-success" />
                  {t('landing.features.allocation.item3')}
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-6">
                <TrendingUp className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-ink-500 mb-3">
                {t('landing.features.projection.title')}
              </h3>
              <p className="text-ink-300 leading-relaxed">
                {t('landing.features.projection.description')}
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-success" />
                  {t('landing.features.projection.item1')}
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-success" />
                  {t('landing.features.projection.item2')}
                </li>
                <li className="flex items-center gap-2 text-sm text-ink-400">
                  <CheckCircle size={16} className="text-success" />
                  {t('landing.features.projection.item3')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-500 mb-4">
              {t('landing.why.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                <Lock className="text-brand-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink-500 mb-2">
                  {t('landing.why.privacy.title')}
                </h3>
                <p className="text-ink-300">
                  {t('landing.why.privacy.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                <Target className="text-gold-500" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink-500 mb-2">
                  {t('landing.why.scientific.title')}
                </h3>
                <p className="text-ink-300">
                  {t('landing.why.scientific.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <Shield className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink-500 mb-2">
                  {t('landing.why.free.title')}
                </h3>
                <p className="text-ink-300">
                  {t('landing.why.free.description')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Calculator className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink-500 mb-2">
                  {t('landing.why.easy.title')}
                </h3>
                <p className="text-ink-300">
                  {t('landing.why.easy.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
            {t('landing.cta.title')}
          </h2>
          <p className="text-lg text-brand-200 mb-10 max-w-2xl mx-auto">
            {t('landing.cta.subtitle')}
          </p>
          <button
            onClick={() => navigate('/finance')}
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-brand-600 rounded-xl font-semibold text-lg hover:bg-brand-50 transition-colors shadow-lg"
          >
            {t('landing.cta.button')}
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-surface-100 border-t border-surface-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-ink-300">
            © {new Date().getFullYear()} Goalvest. {t('footer.allRightsReserved')}
          </p>
        </div>
      </footer>
    </div>
  )
}
