import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FileText, AlertTriangle, Scale, Shield, RefreshCw, Copyright } from 'lucide-react'

export default function Terms() {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto pb-20 lg:pb-0">
      <div className="mb-8">
        <Link to="/" className="text-brand-600 hover:text-brand-700 text-sm flex items-center gap-1">
          ← {t('terms.backToHome')}
        </Link>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
            <FileText className="text-brand-600" size={20} />
          </div>
          <div>
            <h1 className="section-title text-2xl">{t('terms.title')}</h1>
            <p className="text-sm text-ink-200">{t('terms.lastUpdate')}</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-ink-400 space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <Scale size={18} className="text-brand-600" />
              {t('terms.service.title')}
            </h2>
            <p className="leading-relaxed">
              {t('terms.service.intro')}
            </p>
            <ul className="list-disc list-inside space-y-1 mt-3 text-sm">
              <li>{t('terms.service.feature1')}</li>
              <li>{t('terms.service.feature2')}</li>
              <li>{t('terms.service.feature3')}</li>
              <li>{t('terms.service.feature4')}</li>
            </ul>
            <p className="mt-3 text-sm text-ink-300">
              {t('terms.service.freeTool')}
            </p>
          </section>

          <section>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-amber-600 mt-0.5" size={18} />
                <div>
                  <h2 className="text-lg font-semibold text-amber-700 mb-2">{t('terms.disclaimer.title')}</h2>
                  <div className="text-sm text-amber-600 space-y-2">
                    <p className="leading-relaxed">
                      <strong>{t('terms.disclaimer.notInvestmentAdvice')}</strong>{t('terms.disclaimer.notInvestmentAdviceDesc')}
                    </p>
                    <p className="leading-relaxed">
                      {t('terms.disclaimer.investmentRisk')}
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>{t('terms.disclaimer.consultAdvisor')}</li>
                      <li>{t('terms.disclaimer.understandRisk')}</li>
                      <li>{t('terms.disclaimer.personalDecision')}</li>
                    </ul>
                    <p className="leading-relaxed mt-2">
                      {t('terms.disclaimer.noLiability')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <Shield size={18} className="text-brand-600" />
              {t('terms.userResponsibility.title')}
            </h2>
            <p className="leading-relaxed">{t('terms.userResponsibility.intro')}</p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-sm">
              <li>{t('terms.userResponsibility.item1')}</li>
              <li>{t('terms.userResponsibility.item2')}</li>
              <li>{t('terms.userResponsibility.item3')}</li>
              <li>{t('terms.userResponsibility.item4')}</li>
              <li>{t('terms.userResponsibility.item5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <Copyright size={18} className="text-brand-600" />
              {t('terms.intellectualProperty.title')}
            </h2>
            <p className="leading-relaxed">
              {t('terms.intellectualProperty.intro')}
            </p>
            <div className="bg-surface-50 rounded-xl p-4 mt-3">
              <h3 className="font-medium text-ink-500 mb-2">{t('terms.intellectualProperty.scopeTitle')}</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>{t('terms.intellectualProperty.scope1')}</li>
                <li>{t('terms.intellectualProperty.scope2')}</li>
                <li>{t('terms.intellectualProperty.scope3')}</li>
                <li>{t('terms.intellectualProperty.scope4')}</li>
              </ul>
            </div>
            <p className="mt-3 text-sm text-ink-300">
              {t('terms.intellectualProperty.permission')}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <RefreshCw size={18} className="text-brand-600" />
              {t('terms.updates.title')}
            </h2>
            <p className="leading-relaxed">
              {t('terms.updates.intro')}
            </p>
            <p className="mt-3 text-sm text-ink-300">
              {t('terms.updates.continueUse')}
            </p>
          </section>

          <section className="border-t border-surface-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold text-ink-500 mb-3">{t('terms.applicableLaw.title')}</h2>
            <p className="text-sm text-ink-300 leading-relaxed">
              {t('terms.applicableLaw.desc')}
            </p>
          </section>

          <section className="border-t border-surface-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold text-ink-500 mb-3">{t('terms.contact.title')}</h2>
            <p className="text-sm text-ink-300">
              {t('terms.contact.intro')}
              <a href="mailto:legal@goalvest.app" className="text-brand-600 hover:underline ml-1">legal@goalvest.app</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
