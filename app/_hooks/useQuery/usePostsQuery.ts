import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import getPosts from '@actions/getPosts';

const usePostsQuery = (type: string, search: string) => {
  const query = useInfiniteQuery({
    queryKey: ['posts', { type }, { search }],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getPosts(pageParam, type, search),
    getNextPageParam: (lastPage) => lastPage.nextLastId ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
  return query;
};

export default usePostsQuery;
