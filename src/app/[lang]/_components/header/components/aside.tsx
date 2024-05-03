import { usePathname, useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { HeaderUser } from '@customTypes/HeaderUser';

import LocaleSwitcher from './common/LocaleSwitcher';
import LoginAndLogout from './common/LoginAndLogout';

export default function Aside({
  user,
  clickHomeLogo,
  clickMy,
  clickBest,
  showAside,
  hideAside,
}: {
  user: HeaderUser;
  clickHomeLogo: () => Promise<void>;
  clickMy: () => Promise<void>;
  clickBest: () => Promise<void>;
  showAside: boolean;
  hideAside: () => void;
}) {
  const t = useTranslations('common.header');

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const type = searchParams.get('type') ?? '';
  const isHome = pathname === '/' || pathname === '/en';

  if (showAside) {
    return (
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
                      await clickHomeLogo();
                      hideAside();
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
                      hideAside();
                    }}
                  >
                    <span>{t('best')}</span>
                  </button>
                </li>
                {user && (
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
                        hideAside();
                      }}
                    >
                      <span>{t('my')}</span>
                    </button>
                  </li>
                )}
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
    );
  }
}
