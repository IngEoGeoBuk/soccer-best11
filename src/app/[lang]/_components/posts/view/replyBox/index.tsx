import { useState, Fragment } from 'react';

import { useParams } from 'next/navigation';

import AlertBox from '@components/common/alertBox';
import useRepliesQuery from '@hooks/useQuery/useRepliesQuery';

import Modal from './components/modal';
import ReplyListSection from './components/replyListSection';
import Skeleton from './components/skeleton';

function Index({ commentId, isShow }: { commentId: number; isShow: boolean }) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState<number>(0);

  // const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
  //   useRepliesQuery(+id, commentId);
  const query = useRepliesQuery(+id, commentId);

  if (query.status === 'pending') {
    return <Skeleton />;
  }
  if (query.status === 'error') {
    return <AlertBox />;
  }

  if (query.status === 'success' && query.data && isShow) {
    return (
      <>
        <ReplyListSection query={query} setShowModal={setShowModal} />
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </>
    );
  }
  return null;
}

export default Index;
