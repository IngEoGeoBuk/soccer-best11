import { useState, Fragment } from 'react';

import { useParams } from 'next/navigation';

import AlertBox from '@/app/_components/common/alertBox';
import useRepliesQuery from '@/app/_hooks/useQuery/useRepliesQuery';

import Modal from './components/modal';
import ReplyItem from './components/replyItem';
import Skeleton from './components/skeleton';

function Index({ commentId }: { commentId: number }) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState<number>(0);

  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useRepliesQuery(+id, commentId);

  if (status === 'pending') {
    return <Skeleton />;
  }
  if (status === 'error') {
    return <AlertBox />;
  }

  if (status === 'success' && data) {
    return (
      <>
        {data.pages.map((page) => (
          <Fragment key={page.nextLastId ?? 0}>
            {page.data?.map((item) => (
              <ReplyItem
                key={item.id}
                reply={item}
                setShowModal={setShowModal}
              />
            ))}
          </Fragment>
        ))}

        {showModal !== 0 && (
          <Modal showModal={showModal} setShowModal={setShowModal} />
        )}
        {hasNextPage && (
          <div className="pl-10 pb-6 text-base">
            <button
              type="button"
              className="flex items-center text-sm gray-text hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
              disabled={!hasNextPage || isFetchingNextPage}
              onClick={() => {
                fetchNextPage();
              }}
            >
              <svg
                className="mr-1 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 10"
              >
                <path d="m1 7 4 4 4-4M1 1l4 4 4-4" />
              </svg>
              show more
            </button>
          </div>
        )}
      </>
    );
  }
  return null;
}

export default Index;
