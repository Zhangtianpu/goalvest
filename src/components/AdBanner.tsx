import { useTranslation } from 'react-i18next'

interface AdBannerProps {
  slot: string
}

export default function AdBanner({ slot }: AdBannerProps) {
  const { t } = useTranslation()

  return (
    <div className="w-full my-6">
      <div
        data-ad-slot={slot}
        className="flex items-center justify-center bg-surface-200 rounded-lg mx-auto
          w-[320px] h-[100px]
          sm:w-[728px] sm:h-[90px]"
      >
        <span className="text-sm text-ink-300">{t('common.advertisement')}</span>
      </div>
    </div>
  )
}
