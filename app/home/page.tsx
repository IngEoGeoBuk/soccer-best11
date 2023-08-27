'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useSearchParams, redirect, useRouter } from 'next/navigation';

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

import { useSession } from 'next-auth/react';
import AlertBox from '../components/common/alertBox';
import PostSkeletonList from './components/postSkeletonList';
import dateFormat from '../hook/dateFormat';
import { ViewPostList } from '../types/Post';

async function getPosts(nextLastId: number, type: string) {
  const typeQuery = type ? `&type=${type}` : '';
  const { data } = await axios.get(`/api/posts?id=${nextLastId}${typeQuery}`);
  return data;
}

function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { ref, inView } = useInView();

  const { data: session } = useSession();
  // type Query로 해야 하는 이유: 새로고침 할 시 이전 페이지 사라짐.
  const type = searchParams.get('type') ?? '';
  if (type === 'my' && !session?.user?.email) {
    redirect('/signin');
  }

  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', { type }],
    queryFn: ({ pageParam = 0 }) => getPosts(pageParam, type),
    getNextPageParam: (lastPage) => lastPage.nextLastId ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (status === 'loading') {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
          <PostSkeletonList />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return <AlertBox />;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
        {data.pages.map((page) => (
          <React.Fragment key={page.nextLastId}>
            {page.data.map((item: ViewPostList) => (
              <button
                key={item.id}
                className="max-w-full p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 text-left"
                type="button"
                onClick={() => {
                  router.push(`/posts/view/${item.id}`);
                }}
              >
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700 relative">
                  <Image
                    src="/images/champions.png"
                    fill
                    alt="fuyf"
                  />
                </div>
                <div className="flex items-start space-x-4">
                  <Image className="w-10 h-10 rounded-full" src={item.image} alt="" width={40} height={40} />
                  <div className="font-medium dark:text-white">
                    <div>{item.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{dateFormat(new Date(item.createdAt))}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Like:
                      {' '}
                      {String(item.likes)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <PostSkeletonList /> }
      </div>
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
          </svg>
        </button>
      </div>
      <div className="text-right">
        {session && (
          <>
            <br />
            <Link href="/posts/write" className="btn-primary">
              create
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
