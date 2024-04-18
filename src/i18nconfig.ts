// i18nconfig.ts
// (Not to be confused with i18n.ts)

// Remember the Locale type is just a

import { Locale } from './app/types';

export const defaultLocale: Locale = 'ko';

export const locales: Locale[] = ['en', 'ko'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
};
