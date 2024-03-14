import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import Home from '@/app/home/home';
import getPosts from '@actions/getPosts';
import getQueryClient from '@actions/getQueryClient';

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
