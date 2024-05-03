import React, { Fragment, useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  InfiniteData,
  InfiniteQueryObserverSuccessResult,
} from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';

import Champions from '@/public/images/champions.png';
import { ViewPostList } from '@customTypes/Post';
import dateFormat from '@utils/dateFormat';

import PostSkeletonList from './postSkeletonList';

export default function PostListSection({
  query,
}: {
  query: InfiniteQueryObserverSuccessResult<
    InfiniteData<
      {
        data: ViewPostList[];
        nextLastId?: number | undefined;
      },
      unknown
    >,
    Error
  >;
}) {
  const t = useTranslations('home');

  // type Query로 해야 하는 이유: 새로고침 할 시 이전 페이지 사라짐.
  const router = useRouter();

  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = query;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div>
      <div className="post-list-box">
        {data.pages.map((page) => (
          <Fragment key={page.nextLastId ?? 0}>
            {page.data?.map((item) => (
              <button
                key={item.id}
                className="post-button"
                type="button"
                onClick={() => {
                  router.push(`/posts/view/${item.id}`);
                }}
              >
                <div className="champs-img-box">
                  <Image src={Champions} fill alt="champs" priority />
                </div>
                <div className="flex items-start space-x-4">
                  <Image
                    className="w-10 h-10 rounded-full"
                    src={item.image}
                    alt=""
                    width={40}
                    height={40}
                  />
                  <div className="font-medium dark:text-white">
                    <div>{item.title}</div>
                    <div className="text-xs mt-1 gray-text">{item.email}</div>
                    <div className="text-sm gray-text">
                      {dateFormat(new Date(item.createdAt))}
                    </div>
                    <div className="text-sm gray-text">
                      {t('like')}: {String(item.likes)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage && <PostSkeletonList />}
      </div>
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
    </div>
  );
}
