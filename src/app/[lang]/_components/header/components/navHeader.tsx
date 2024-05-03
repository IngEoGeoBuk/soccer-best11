import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import Logo from '@/public/images/logo.png';
import { HeaderUser } from '@customTypes/HeaderUser';

import LocaleSwitcher from './common/LocaleSwitcher';
import LoginAndLogout from './common/LoginAndLogout';
import ThemeSwitcher from './common/ThemeSwitcher';

function LogoBtn({ clickHomeLogo }: { clickHomeLogo: () => Promise<void> }) {
  return (
    <button
      type="button"
      className="flex items-center"
      onClick={async () => {
        await clickHomeLogo();
      }}
    >
      <Image
        src={Logo}
        className="mr-3 dark:brightness-0 dark:invert"
        alt="Flowbite Logo"
        width={30}
        height={30}
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        UCL
      </span>
    </button>
  );
}

function Hamburger({ clickBtn }: { clickBtn: () => void }) {
  return (
    <button
      type="button"
      className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      onClick={clickBtn}
    >
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
        hamburger-btn
      </svg>
    </button>
  );
}

export default function NavHeader({
  user,
  clickHomeLogo,
  clickMy,
  clickBest,
  toggleAside,
}: {
  user: HeaderUser;
  clickHomeLogo: () => Promise<void>;
  clickMy: () => Promise<void>;
  clickBest: () => Promise<void>;
  toggleAside: () => void;
}) {
  const t = useTranslations('common.header');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/en';

  const type = searchParams.get('type') ?? '';

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <LogoBtn clickHomeLogo={clickHomeLogo} />
          <Hamburger clickBtn={toggleAside} />
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-multi-level"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {isHome && (
                <>
                  <li>
                    <button
                      type="button"
                      onClick={async () => {
                        await clickHomeLogo();
                      }}
                      className={
                        !type && isHome ? 'header-item-clicked' : 'header-item'
                      }
                    >
                      {t('home')}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={async () => {
                        await clickBest();
                      }}
                      className={
                        type === 'best' && isHome
                          ? 'header-item-clicked'
                          : 'header-item'
                      }
                    >
                      {t('best')}
                    </button>
                  </li>
                  {user && (
                    <li>
                      <button
                        type="button"
                        onClick={async () => {
                          await clickMy();
                        }}
                        className={
                          type === 'my' && isHome
                            ? 'header-item-clicked'
                            : 'header-item'
                        }
                      >
                        {t('my')}
                      </button>
                    </li>
                  )}
                </>
              )}
              <ThemeSwitcher />
              <li>
                <LocaleSwitcher className="header-item" />
              </li>
              <li>
                <LoginAndLogout user={user} className="header-item" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
