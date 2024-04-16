import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';

import getPlayersByClub from '@actions/getPlayers';
import getQueryClient from '@actions/getQueryClient';
import Club from '@constants/Club';

import Write from './write';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'post.writeMetadata',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function WritePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['players', Club[3][0]],
    queryFn: () => getPlayersByClub(Club[3][0]),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Write />
    </HydrationBoundary>
  );
}
