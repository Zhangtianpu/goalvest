import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  Target, 
  PieChart, 
  TrendingUp, 
  Shield, 
  Users, 
  Lightbulb,
  BarChart3,
  Calculator
} from 'lucide-react'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto pb-20 lg:pb-0">
      <div className="mb-8">
        <Link to="/" className="text-brand-600 hover:text-brand-700 text-sm flex items-center gap-1">
          ← {t('about.backToHome')}
        </Link>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
            <Target className="text-brand-600" size={20} />
          </div>
          <div>
            <h1 className="section-title text-2xl">{t('about.title')}</h1>
            <p className="text-sm text-ink-200">{t('about.subtitle')}</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-ink-400 space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-ink-500 mb-3">{t('about.intro.title')}</h2>
            <p className="leading-relaxed">
              {t('about.intro.desc1')}
            </p>
            <p className="mt-3 leading-relaxed">
              {t('about.intro.desc2')}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 mb-3">{t('about.features.title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-surface-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                    <BarChart3 size={16} className="text-brand-600" />
                  </div>
                  <h3 className="font-medium text-ink-500">{t('about.features.financialAnalysis')}</h3>
                </div>
                <p className="text-sm text-ink-300">
                  {t('about.features.financialAnalysisDesc')}
                </p>
              </div>

              <div className="bg-surface-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center">
                    <PieChart size={16} className="text-gold-500" />
                  </div>
                  <h3 className="font-medium text-ink-500">{t('about.features.assetAllocation')}</h3>
                </div>
                <p className="text-sm text-ink-300">
                  {t('about.features.assetAllocationDesc')}
                </p>
              </div>

              <div className="bg-surface-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <TrendingUp size={16} className="text-green-600" />
                  </div>
                  <h3 className="font-medium text-ink-500">{t('about.features.futureProjection')}</h3>
                </div>
                <p className="text-sm text-ink-300">
                  {t('about.features.futureProjectionDesc')}
                </p>
              </div>

              <div className="bg-surface-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Calculator size={16} className="text-purple-600" />
                  </div>
                  <h3 className="font-medium text-ink-500">{t('about.features.savingsEvaluation')}</h3>
                </div>
                <p className="text-sm text-ink-300">
                  {t('about.features.savingsEvaluationDesc')}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <Lightbulb size={18} className="text-brand-600" />
              {t('about.technicalPrinciples.title')}
            </h2>
            <p className="leading-relaxed">
              {t('about.technicalPrinciples.intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-sm">
              <li>
                <strong>{t('about.technicalPrinciples.mptTitle')}</strong>
                {t('about.technicalPrinciples.mptDesc')}
              </li>
              <li>
                <strong>{t('about.technicalPrinciples.lifecycleTitle')}</strong>
                {t('about.technicalPrinciples.lifecycleDesc')}
              </li>
              <li>
                <strong>{t('about.technicalPrinciples.goalTitle')}</strong>
                {t('about.technicalPrinciples.goalDesc')}
              </li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
              <p className="text-sm text-blue-600">
                <strong>{t('about.technicalPrinciples.noteTitle')}</strong>{t('about.technicalPrinciples.noteDesc')}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <Shield size={18} className="text-brand-600" />
              {t('about.privacy.title')}
            </h2>
            <p className="leading-relaxed">
              {t('about.privacy.intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-sm">
              <li>{t('about.privacy.item1')}</li>
              <li>{t('about.privacy.item2')}</li>
              <li>{t('about.privacy.item3')}</li>
              <li>{t('about.privacy.item4')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <Users size={18} className="text-brand-600" />
              {t('about.team.title')}
            </h2>
            <p className="leading-relaxed">
              {t('about.team.intro')}
            </p>
            <div className="bg-surface-50 rounded-xl p-4 mt-4">
              <h3 className="font-medium text-ink-500 mb-2">{t('about.team.visionTitle')}</h3>
              <p className="text-sm text-ink-300">
                {t('about.team.visionDesc')}
              </p>
            </div>
          </section>

          <section className="border-t border-surface-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold text-ink-500 mb-3">{t('about.contact.title')}</h2>
            <p className="text-sm text-ink-300">
              {t('about.contact.intro')}
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                {t('about.contact.general')}：
                <a href="mailto:hello@goalvest.app" className="text-brand-600 hover:underline ml-1">hello@goalvest.app</a>
              </li>
              <li>
                {t('about.contact.support')}：
                <a href="mailto:support@goalvest.app" className="text-brand-600 hover:underline ml-1">support@goalvest.app</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
