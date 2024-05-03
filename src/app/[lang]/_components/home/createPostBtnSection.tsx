import Link from 'next/link';

import { useTranslations } from 'next-intl';

export default function CreatePostBtnSection({
  isLogin,
}: {
  isLogin: boolean;
}) {
  const t = useTranslations('home');

  if (isLogin) {
    return (
      <div className="text-right pt-6">
        <Link href="/posts/write" className="btn-primary">
          {t('create')}
        </Link>
      </div>
    );
  }
}
