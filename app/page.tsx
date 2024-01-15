import React from 'react';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import Home from './home/home';
import getPosts from './utils/getPosts';
import getQueryClient from './utils/getQueryClient';

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
