import { signOut, signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { HeaderUser } from '@customTypes/HeaderUser';

export default function LoginAndLogout({
  user,
  className,
}: {
  user: HeaderUser;
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
