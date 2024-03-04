import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import getPlayersByClub from '@/app/_actions/getPlayers';
import getQueryClient from '@/app/_actions/getQueryClient';
import Club from '@/app/_constants/Club';

import Write from './write';

export const metadata = {
  title: 'Soccer Best11 - Write',
  description: 'Generate your best team!',
};

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
