import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';

import getPosts from '@actions/getPosts';
import getQueryClient from '@actions/getQueryClient';
import Home from '@lang/home/home';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'home.metadata',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

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
