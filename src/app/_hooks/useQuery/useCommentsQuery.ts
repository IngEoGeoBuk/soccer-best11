import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import getComments from '@actions/getComments';

const useCommentsQuery = (id: number) => {
  const query = useInfiniteQuery({
    queryKey: ['comments', { postId: id }],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getComments(id, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextLastId ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    placeholderData: keepPreviousData,
  });
  return query;
};

export default useCommentsQuery;
