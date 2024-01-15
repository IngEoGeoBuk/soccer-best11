import React from 'react';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import getPosts from '@/app/_actions/getPosts';
import getQueryClient from '@/app/_actions/getQueryClient';

import Home from './home/home';

export const metadata = {
  title: 'Soccer Best11',
  description: 'Generate your best team!',
};

export default async function HomePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', { type: '' }, { search: '' }],
    queryFn: ({ pageParam }) => getPosts(pageParam, '', ''),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
