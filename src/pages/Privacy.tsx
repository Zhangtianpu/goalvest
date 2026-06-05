import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Shield, Database, Cookie, ExternalLink, Mail, UserCheck, Lock } from 'lucide-react'

export default function Privacy() {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto pb-20 lg:pb-0">
      <div className="mb-8">
        <Link to="/" className="text-brand-600 hover:text-brand-700 text-sm flex items-center gap-1">
          ← {t('privacy.backToHome')}
        </Link>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
            <Shield className="text-brand-600" size={20} />
          </div>
          <div>
            <h1 className="section-title text-2xl">{t('privacy.title')}</h1>
            <p className="text-sm text-ink-200">{t('privacy.lastUpdate')}</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-ink-400 space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <Database size={18} className="text-brand-600" />
              {t('privacy.dataCollection.title')}
            </h2>
            <p className="leading-relaxed">
              {t('privacy.dataCollection.intro')}
            </p>
            <div className="bg-surface-50 rounded-xl p-4 mt-3">
              <h3 className="font-medium text-ink-500 mb-2">{t('privacy.dataCollection.whatWeCollect')}</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>{t('privacy.dataCollection.financialInfo')}</li>
                <li>{t('privacy.dataCollection.personalSettings')}</li>
                <li>{t('privacy.dataCollection.usagePreferences')}</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-3">
              <div className="flex items-start gap-2">
                <Lock className="text-green-600 mt-0.5" size={18} />
                <div>
                  <h3 className="font-medium text-green-700 mb-1">{t('privacy.dataCollection.importantPromise')}</h3>
                  <p className="text-sm text-green-600">
                    {t('privacy.dataCollection.promiseDesc')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <Cookie size={18} className="text-brand-600" />
              {t('privacy.cookies.title')}
            </h2>
            <p className="leading-relaxed">
              {t('privacy.cookies.intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-sm">
              <li>
                <strong>{t('privacy.cookies.localStorageTitle')}</strong>{t('privacy.cookies.localStorageDesc')}
              </li>
              <li>
                <strong>{t('privacy.cookies.sessionStorageTitle')}</strong>{t('privacy.cookies.sessionStorageDesc')}
              </li>
              <li>
                <strong>{t('privacy.cookies.cookiesTitle')}</strong>{t('privacy.cookies.cookiesDesc')}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <ExternalLink size={18} className="text-brand-600" />
              {t('privacy.thirdParty.title')}
            </h2>
            <p className="leading-relaxed">
              {t('privacy.thirdParty.intro')}
            </p>
            <div className="bg-surface-50 rounded-xl p-4 mt-3">
              <h3 className="font-medium text-ink-500 mb-2">{t('privacy.thirdParty.googleAdSense')}</h3>
              <p className="text-sm text-ink-300 leading-relaxed">
                {t('privacy.thirdParty.adSenseDesc1')}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline mx-1">
                  {t('privacy.thirdParty.googleAdSettings')}
                </a>
                {t('privacy.thirdParty.adSenseDesc2')}
              </p>
              <p className="text-sm text-ink-300 mt-2 leading-relaxed">
                {t('privacy.thirdParty.googlePrivacyInfo')}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline mx-1">
                  {t('privacy.thirdParty.googlePrivacyPolicy')}
                </a>
                。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <UserCheck size={18} className="text-brand-600" />
              {t('privacy.userRights.title')}
            </h2>
            <p className="leading-relaxed">{t('privacy.userRights.intro')}</p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-sm">
              <li><strong>{t('privacy.userRights.accessTitle')}</strong>{t('privacy.userRights.accessDesc')}</li>
              <li><strong>{t('privacy.userRights.deleteTitle')}</strong>{t('privacy.userRights.deleteDesc')}</li>
              <li><strong>{t('privacy.userRights.exportTitle')}</strong>{t('privacy.userRights.exportDesc')}</li>
              <li><strong>{t('privacy.userRights.controlTitle')}</strong>{t('privacy.userRights.controlDesc')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink-500 flex items-center gap-2 mb-3">
              <Mail size={18} className="text-brand-600" />
              {t('privacy.contact.title')}
            </h2>
            <p className="leading-relaxed">
              {t('privacy.contact.intro')}
            </p>
            <div className="bg-surface-50 rounded-xl p-4 mt-3">
              <p className="text-sm text-ink-300">
                {t('privacy.contact.email')}：<a href="mailto:privacy@goalvest.app" className="text-brand-600 hover:underline">privacy@goalvest.app</a>
              </p>
            </div>
          </section>

          <section className="border-t border-surface-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold text-ink-500 mb-3">{t('privacy.updates.title')}</h2>
            <p className="text-sm text-ink-300 leading-relaxed">
              {t('privacy.updates.desc')}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
