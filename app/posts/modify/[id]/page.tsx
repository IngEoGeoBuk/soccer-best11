import React from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import getPlayersByClub from '@/app/hook/getPlayers';
import Club from '@/app/constants/Club';
import Modify from './modify';

export const metadata = {
  title: 'Soccer Best11 - Modify',
  description: 'Generate your best team!',
};

export default async function ModifyPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['players', Club[3][0]],
    queryFn: () => getPlayersByClub(Club[3][0]),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Modify />
    </HydrationBoundary>
  );
}
