import { useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import AlertBox from '@components/common/alertBox';
import Modal from '@components/posts/contentBox/modal';
import ViewPlayersSection from '@components/posts/contentBox/viewPlayersSection';
import PostDetailSkeleton from '@components/posts/skeleton';
import usePostQuery from '@hooks/useQuery/usePostQuery';
import dateFormat from '@utils/dateFormat';

import '@lang/posts/styles.css';
import '@components/posts/contentBox/styles.css';

function Index() {
  const t = useTranslations('post.contentBox');

  const { id } = useParams();
  const email = useSession().data?.user?.email;

  const { status, data } = usePostQuery(+id);

  const [showModal, setShowModal] = useState(false);

  if (status === 'pending') {
    return <PostDetailSkeleton />;
  }

  if (status === 'error') {
    return <AlertBox data-testid="content-box-error" />;
  }

  if (status === 'success' && data) {
    return (
      <div data-testid={`content-box-${id}`}>
        <div className="flex justify-between">
          <h3 className="h3-paragraph">{t('title')}</h3>
          <p className="gray-paragraph">
            {data.updatedAt
              ? `${dateFormat(data.updatedAt)} (${t('edited')})`
              : dateFormat(data.createdAt)}
          </p>
        </div>
        <p className="gray-paragraph">{data.title}</p>
        <br />
        <ViewPlayersSection players={data.players} />
        <br />
        <h3 className="h3-paragraph">{t('description')}</h3>
        <p className="gray-paragraph">{data.description}</p>
        <br />
        {email === data.email && (
          <div className="text-right">
            <Link href={`/posts/modify/${id}`} className="btn-secondary">
              {t('modify')}
            </Link>
            <button
              data-testid="delete-post-btn"
              className="btn-primary"
              type="button"
              onClick={() => setShowModal(true)}
            >
              {t('delete')}
            </button>
          </div>
        )}
        {showModal && <Modal setShowModal={setShowModal} />}
        <hr className="h-px mt-2 mb-8 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
    );
  }
  return null;
}

export default Index;
