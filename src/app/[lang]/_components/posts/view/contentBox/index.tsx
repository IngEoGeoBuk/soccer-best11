import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import AlertBox from '@components/common/alertBox';
import PostDetailSkeleton from '@components/posts/common/skeleton';
import usePostQuery from '@hooks/useQuery/usePostQuery';
import dateFormat from '@utils/dateFormat';

import Modal from './components/modal';
import ModifyAndDeleteSection from './components/modifyAndDeleteSection';
import ViewPlayersSection from './components/viewPlayersSection';

import '@lang/posts/styles.css';
import '@components/posts/view/contentBox/styles.css';

function Index({ email }: { email: string }) {
  const t = useTranslations('post.contentBox');

  const { id } = useParams();

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
        <ModifyAndDeleteSection
          isShow={email === data.email}
          id={id as string}
          showModal={() => setShowModal(true)}
        />
        <hr className="h-px mt-2 mb-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </div>
    );
  }
  return null;
}

export default Index;
