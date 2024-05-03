'use client';

import { useSearchParams, redirect } from 'next/navigation';

import { useSession } from 'next-auth/react';

import AlertBox from '@components/common/alertBox';
import CreatePostBtnSection from '@components/home/createPostBtnSection';
import PostListSection from '@components/home/postListSection';
import PostSkeletonList from '@components/home/postSkeletonList';
import SearchPostInput from '@components/home/searchPostInput';
import usePostsQuery from '@hooks/useQuery/usePostsQuery';

import '@lang/home/styles.css';

export default function Home({ isLogin }: { isLogin: boolean }) {
  const searchParams = useSearchParams();

  // type Query로 해야 하는 이유: 새로고침 할 시 이전 페이지 사라짐.
  const type = searchParams.get('type') ?? '';
  const search = searchParams.get('search') ?? '';
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      if (type === 'my' && !session?.user?.email) {
        redirect('/signIn');
      }
    },
  });

  const query = usePostsQuery(type, search);

  if (query.status === 'pending') {
    return <PostSkeletonList />;
  }

  if (query.status === 'error') {
    return <AlertBox />;
  }

  if (query.status === 'success') {
    return (
      <div className="w-full" data-testid="home-success">
        <SearchPostInput />
        <PostListSection query={query} />
        <CreatePostBtnSection isLogin={isLogin} />
      </div>
    );
  }
  return null;
}
