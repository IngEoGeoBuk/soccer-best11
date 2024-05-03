// app/_components/LocaleSwitcher.tsx

'use client';

import { useLocale } from 'next-intl';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { localeNames, locales } from '@/src/i18nconfig';

export default function LocaleSwitcher({ className }: { className: string }) {
  const { useRouter, usePathname } = createSharedPathnamesNavigation({
    locales,
  });

  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();

  const switchLocale = () => {
    const result = locale === 'ko' ? 'en' : 'ko';
    router.push(pathName, { locale: result });
  };

  return (
    <button type="button" onClick={switchLocale} className={className}>
      {locale === 'ko' ? localeNames.ko : localeNames.en}
    </button>
  );
}
