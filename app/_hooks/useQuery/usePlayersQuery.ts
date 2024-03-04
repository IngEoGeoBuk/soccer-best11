import { keepPreviousData, useQuery } from '@tanstack/react-query';

import getPlayersByClub from '@/app/_actions/getPlayers';
import Club from '@/app/_constants/Club';

const usePlayersQuery = (national: number, club: number) => {
  const query = useQuery({
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
