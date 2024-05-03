import { Fragment } from 'react';

import {
  InfiniteData,
  InfiniteQueryObserverSuccessResult,
} from '@tanstack/react-query';

import { ViewReply } from '@customTypes/Reply';

import ReplyItem from './replyItem';

export default function ReplyListSection({
  query,
  setShowModal,
}: {
  query: InfiniteQueryObserverSuccessResult<
    InfiniteData<
      {
        data: ViewReply[];
        nextLastId?: number | undefined;
      },
      unknown
    >,
    Error
  >;
  setShowModal: (value: number) => void;
}) {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = query;
  return (
    <section>
      {data.pages.map((page) => (
        <Fragment key={page.nextLastId ?? 0}>
          {page.data?.map((item) => (
            <ReplyItem key={item.id} reply={item} setShowModal={setShowModal} />
          ))}
        </Fragment>
      ))}
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
    </section>
  );
}
