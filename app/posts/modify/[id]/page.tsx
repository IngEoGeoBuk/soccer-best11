import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import getPlayersByClub from '@/app/_actions/getPlayers';
import getPost from '@/app/_actions/getPost';
import getQueryClient from '@/app/_actions/getQueryClient';
import Club from '@/app/_constants/Club';

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
