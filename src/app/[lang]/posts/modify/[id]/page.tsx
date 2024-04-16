import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';

import getPlayersByClub from '@actions/getPlayers';
import getPost from '@actions/getPost';
import getQueryClient from '@actions/getQueryClient';
import Club from '@constants/Club';

import Modify from './modify';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'post.modifyMetadata',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ModifyPage({
  params,
}: {
  params: { id: number };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['players', Club[3][0]],
    queryFn: () => getPlayersByClub(Club[3][0]),
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', +params.id],
    queryFn: () => getPost(+params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Modify />
    </HydrationBoundary>
  );
}
