import React from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getPlayersByClub from '@/app/utils/getPlayers';
import Club from '@/app/constants/Club';
import { ViewPost } from '@/app/types/Post';
import { Player } from '@prisma/client';
import getPost from '@/app/utils/getPost';
import getQueryClient from '@/app/utils/getQueryClient';
import Modify from './modify';

export const metadata = {
  title: 'Soccer Best11 - Modify',
  description: 'Generate your best team!',
};

export default async function ModifyPage({
  params,
}: {
  params: { id: number };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<Player[]>({
    queryKey: ['players', Club[3][0]],
    queryFn: () => getPlayersByClub(Club[3][0]),
  });
  await queryClient.prefetchQuery<ViewPost>({
    queryKey: ['posts', +params.id],
    queryFn: () => getPost(+params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Modify />
    </HydrationBoundary>
  );
}
