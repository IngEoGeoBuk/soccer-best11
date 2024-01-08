import React from 'react';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getPosts from './utils/getPosts';
import Home from './home/home';

export const metadata = {
  title: 'Soccer Best11',
  description: 'Generate your best team!',
};

export default async function HomePage() {
  const queryClient = new QueryClient();
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
