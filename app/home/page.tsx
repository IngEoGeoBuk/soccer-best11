'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams, redirect } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useSession } from 'next-auth/react';
import Spinner from '../components/common/spinner';
import AlertBox from '../components/common/alertBox';
// import Pagination from './components/pagination';
import PostListSkeleton from './components/skeleton';
import PostList from './components/postList';

async function getPosts(page = 0, type = '') {
  const typeQuery = type ? `&type=${type}` : '';
  const { data } = await axios.get(`/api/posts?page=${page}${typeQuery}`);
  return data;
}

function Home() {
  const searchParams = useSearchParams();
  // page Query로 해야 하는 이유: 새로고침 할 시 이전 페이지 사라짐.
  const page = Number(searchParams.get('page')) === 0 ? 1 : Number(searchParams.get('page'));
  const type = searchParams.get('type') ?? '';
  const { data: session, status } = useSession();
  // const [page, setPage] = useState(1);

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts', { page }, { type }],
    queryFn: () => getPosts(page, type),
    keepPreviousData: true,
    staleTime: 5000,
  });

  if (type === 'my' && !session?.user?.email) {
    redirect('/signin');
  }

  if (isLoading) {
    return <PostListSkeleton />;
  }

  if (error) {
    return <AlertBox />;
  }

  if (data?.post) {
    return (
      <div className="w-full">
        <PostList post={data.post} />
        {/* <Pagination
          page={page}
          hasPrevious={data.hasPrevious}
          previousPage={data.previousPage}
          hasNext={data.hasNext}
          nextPage={data.nextPage}
          pageList={data.pageList}
        /> */}
        {status === 'loading' ? (
          <Spinner />
        ) : (
          <div className="text-right">
            {status === 'authenticated' ? (
              <Link href="/posts/write" className="btn-primary">
                create
              </Link>
            ) : (
              null
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
