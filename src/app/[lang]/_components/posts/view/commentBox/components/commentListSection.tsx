import { useEffect, Fragment } from 'react';

import {
  InfiniteData,
  InfiniteQueryObserverSuccessResult,
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { ViewComment } from '@customTypes/Comment';

import CommentItem from './commentItem';

export default function CommentListSection({
  query,
  email,
  setShowModal,
}: {
  query: InfiniteQueryObserverSuccessResult<
    InfiniteData<
      {
        data: ViewComment[];
        nextLastId?: number | undefined;
      },
      unknown
    >,
    Error
  >;
  email: string | undefined;
  setShowModal: (value: number) => void;
}) {
  const { ref, inView } = useInView();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = query;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section>
      {data.pages.map((page) => (
        <Fragment key={page.nextLastId ?? 0}>
          {page.data?.map((item) => (
            <CommentItem
              key={item.id}
              comment={item}
              setShowModal={setShowModal}
              email={email}
            />
          ))}
        </Fragment>
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
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1v12m0 0 4-4m-4 4L1 9"
              />
              show-more
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
