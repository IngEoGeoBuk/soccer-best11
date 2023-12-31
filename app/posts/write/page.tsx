import React from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import Club from '@/app/constants/Club';
import getPlayersByClub from '@/app/hook/getPlayers';
import Write from './write';

export const metadata = {
  title: 'Soccer Best11 - Write',
  description: 'Generate your best team!',
};

export default async function WritePage() {
  const queryClient = new QueryClient();
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
