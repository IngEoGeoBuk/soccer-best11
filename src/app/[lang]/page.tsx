import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth/next';
import { getTranslations } from 'next-intl/server';

import getPosts from '@actions/getPosts';
import getQueryClient from '@actions/getQueryClient';
import Home from '@lang/home/home';
import authOptions from '@utils/authOptions';

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
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home isLogin={Boolean(user)} />
    </HydrationBoundary>
  );
}
