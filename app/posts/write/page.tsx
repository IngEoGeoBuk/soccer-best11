import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import getPlayersByClub from '@actions/getPlayers';
import getQueryClient from '@actions/getQueryClient';
import Club from '@constants/Club';

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
