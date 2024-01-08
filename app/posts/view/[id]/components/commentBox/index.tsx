import React, { useEffect, useState } from 'react';
// import axios from 'axios';

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AlertBox from '@/app/components/common/alertBox';
import { useInView } from 'react-intersection-observer';
import { ViewComment } from '@/app/types/Comment';
import useCommentsQuery from '@/app/hooks/useQuery/useCommentsQuery';
import AddCommentBox from './components/addCommentBox';
import CommentItem from './components/commentItem';
import Modal from './components/modal';
import Skeleton from './components/skeleton';

function Index() {
  const { id } = useParams();
  const { ref, inView } = useInView();
  const email = useSession().data?.user?.email;
  const [showModal, setShowModal] = useState<number>(0);

  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useCommentsQuery(+id);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (status === 'pending') {
    return <Skeleton />;
  }

  if (status === 'error') {
    return <AlertBox />;
  }

  if (status === 'success' && data) {
    return (
      <div data-testid={`comment-box-${id}`}>
        {email && <AddCommentBox />}
        {data.pages.map((page) => (
          <React.Fragment key={page.nextLastId ?? 0}>
            {page.data?.map((item: ViewComment) => (
              <CommentItem
                key={item.id}
                comment={item}
                setShowModal={setShowModal}
              />
            ))}
          </React.Fragment>
        ))}
        {hasNextPage && (
          <div className="flex py-5 justify-center">
            <button
              ref={ref}
              type="button"
              disabled={!hasNextPage || isFetchingNextPage}
              onClick={() => {
                fetchNextPage();
              }}
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v12m0 0 4-4m-4 4L1 9" />
                show-more
              </svg>
            </button>
          </div>
        )}
        {showModal !== 0 && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    );
  }

  return null;
}

export default Index;
