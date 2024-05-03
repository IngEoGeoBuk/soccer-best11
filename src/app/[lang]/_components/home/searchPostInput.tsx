import { useState, useEffect } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

export default function SearchPostInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type') ?? '';

  const t = useTranslations('home');

  const [value, setValue] = useState<string>('');
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const typeQuery = type ? `?type=${type}&` : '?';
    router.push(`/${typeQuery}search=${value}`);
  };

  useEffect(() => {
    setValue('');
  }, [type]);

  return (
    <form onSubmit={handleSubmit} className="pt-5">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 gray-text"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          aria-label="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={t('searchPlaceHolder')}
          maxLength={20}
          value={value}
          onChange={handleValueChange}
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t('search')}
        </button>
      </div>
    </form>
  );
}
