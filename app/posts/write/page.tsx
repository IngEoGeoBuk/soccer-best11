import React from 'react';

import { Player } from '@prisma/client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import Club from '@/app/constants/Club';
import getPlayersByClub from '@/app/utils/getPlayers';
import getQueryClient from '@/app/utils/getQueryClient';

import Write from './write';

export const metadata = {
  title: 'Soccer Best11 - Write',
  description: 'Generate your best team!',
};

export default async function WritePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<Player[]>({
    queryKey: ['players', Club[3][0]],
    queryFn: () => getPlayersByClub(Club[3][0]),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Write />
    </HydrationBoundary>
  );
}
