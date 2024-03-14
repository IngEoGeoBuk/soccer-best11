'use client';

import { useState, useEffect, Fragment } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, redirect, useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';
import { useInView } from 'react-intersection-observer';

import Champions from '@/public/images/champions.png';
import AlertBox from '@components/common/alertBox';
import PostSkeletonList from '@components/home/postSkeletonList';
import usePostsQuery from '@hooks/useQuery/usePostsQuery';
import dateFormat from '@utils/dateFormat';

import '@/app/home/styles.css';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { ref, inView } = useInView();

  // type Query로 해야 하는 이유: 새로고침 할 시 이전 페이지 사라짐.
  const type = searchParams.get('type') ?? '';
  const search = searchParams.get('search') ?? '';
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      if (type === 'my' && !session?.user?.email) {
        redirect('/sign');
      }
    },
  });

  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    usePostsQuery(type, search);

  const [value, setValue] = useState<string>('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const typeQuery = type ? `?type=${type}&` : '?';
    router.push(`/${typeQuery}search=${value}`);
  };

  useEffect(() => {
    setValue('');
  }, [type]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (status === 'pending') {
    return (
      <div className="w-full" data-testid="home-loading">
        <div className="post-list-box">
          <PostSkeletonList />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return <AlertBox />;
  }

  if (status === 'success') {
    return (
      <div className="w-full" data-testid="home-success">
        <form onSubmit={handleSubmit} className="pt-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 gray-text"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              aria-label="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              maxLength={20}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
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
                        Like: {String(item.likes)}
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
  return null;
}
