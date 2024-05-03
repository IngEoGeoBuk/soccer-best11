import Link from 'next/link';

import { useTranslations } from 'next-intl';

export default function ModifyAndDeleteSection({
  isShow,
  id,
  showModal,
}: {
  isShow: boolean;
  id: string;
  showModal: () => void;
}) {
  const t = useTranslations('post.contentBox');

  if (isShow) {
    return (
      <section className="text-right">
        <Link href={`/posts/modify/${id}`} className="btn-secondary">
          {t('modify')}
        </Link>
        <button
          data-testid="delete-post-btn"
          className="btn-primary"
          type="button"
          onClick={showModal}
        >
          {t('delete')}
        </button>
      </section>
    );
  }
}
