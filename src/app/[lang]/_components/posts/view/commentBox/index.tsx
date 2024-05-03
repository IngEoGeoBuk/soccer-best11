import { useState } from 'react';

import { useParams } from 'next/navigation';

import AlertBox from '@components/common/alertBox';
import useCommentsQuery from '@hooks/useQuery/useCommentsQuery';

import AddCommentBox from './components/addCommentBox';
import CommentListSection from './components/commentListSection';
import Modal from './components/modal';
import Skeleton from './components/skeleton';

function Index({ email }: { email: string | undefined }) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState<number>(0);

  const query = useCommentsQuery(+id);

  if (query.status === 'pending') {
    return <Skeleton />;
  }

  if (query.status === 'error') {
    return <AlertBox />;
  }

  if (query.status === 'success' && query.data) {
    return (
      <div data-testid={`comment-box-${id}`}>
        {email && <AddCommentBox />}
        <CommentListSection
          query={query}
          email={email}
          setShowModal={setShowModal}
        />
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </div>
    );
  }

  return null;
}

export default Index;
