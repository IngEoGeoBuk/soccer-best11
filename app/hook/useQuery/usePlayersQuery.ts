import Club from '@/app/constants/Club';
import { Player } from '@prisma/client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import getPlayersByClub from '../getPlayers';

const usePlayersQuery = (national: number, club: number) => {
  const query = useQuery<Player[]>({
    queryKey: ['players', Club[national][club]],
    queryFn: () => getPlayersByClub(Club[national][club]),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 8,
    placeholderData: keepPreviousData,
  });

  return query;
};

export default usePlayersQuery;
