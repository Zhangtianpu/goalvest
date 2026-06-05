import { useTranslation } from 'react-i18next'

interface AdSidebarProps {
  slot: string
}

export default function AdSidebar({ slot }: AdSidebarProps) {
  const { t } = useTranslation()

  return (
    <div className="w-full my-4">
      <div
        data-ad-slot={slot}
        className="flex items-center justify-center bg-surface-200 rounded-lg
          w-[300px] h-[250px] mx-auto"
      >
        <span className="text-sm text-ink-300">{t('common.advertisement')}</span>
      </div>
    </div>
  )
}
