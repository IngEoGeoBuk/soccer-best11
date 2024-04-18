'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { signOut, signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import Logo from '@/public/images/logo.png';

import './header.css';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

function LoginAndLogout({
  user,
  className,
}: {
  user: User;
  className: string;
}) {
  const t = useTranslations('common.header');

  return (
    <div>
      {user ? (
        <button type="button" onClick={() => signOut()} className={className}>
          {t('logout')}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => signIn('google')}
          className={className}
        >
          {t('login')}
        </button>
      )}
    </div>
  );
}

function Header({ user }: { user: User }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/en';

  const type = searchParams.get('type') ?? '';
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations('common.header');

  const [showAside, setShowAside] = useState<boolean>(false);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setShowAside(false);
    }
  };

  const clickLogoOrHome = async () => {
    if (isHome && !type) {
      queryClient.refetchQueries({ queryKey: ['posts'] });
    }
    router.push('/');
  };

  const clickMy = async () => {
    if (isHome && type === 'my') {
      queryClient.refetchQueries({ queryKey: ['posts'] });
    }
    router.push('/?type=my');
  };

  const clickBest = async () => {
    if (isHome && type === 'best') {
      queryClient.refetchQueries({ queryKey: ['posts'] });
    }
    router.push('/?type=best');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <button
              type="button"
              className="flex items-center"
              onClick={async () => {
                await clickLogoOrHome();
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
            <button
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setShowAside(!showAside)}
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
                          await clickLogoOrHome();
                        }}
                        className={
                          !type && isHome
                            ? 'header-item-clicked'
                            : 'header-item'
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
      {showAside && (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full translate-x-0">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              {isHome && (
                <>
                  <li>
                    <button
                      type="button"
                      className={
                        !type && isHome ? 'aside-menu-clicked' : 'aside-menu'
                      }
                      onClick={async () => {
                        await clickLogoOrHome();
                        setShowAside(false);
                      }}
                    >
                      <span>{t('home')}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={
                        type === 'best' && isHome
                          ? 'aside-menu-clicked'
                          : 'aside-menu'
                      }
                      onClick={async () => {
                        await clickBest();
                        setShowAside(false);
                      }}
                    >
                      <span>{t('best')}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={
                        type === 'my' && isHome
                          ? 'aside-menu-clicked'
                          : 'aside-menu'
                      }
                      onClick={async () => {
                        await clickMy();
                        setShowAside(false);
                      }}
                    >
                      <span>{t('my')}</span>
                    </button>
                  </li>
                </>
              )}
              <li>
                <span>
                  <LocaleSwitcher className="aside-menu" />
                </span>
              </li>
              <li>
                <span>
                  <LoginAndLogout user={user} className="aside-menu" />
                </span>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}

export default Header;
