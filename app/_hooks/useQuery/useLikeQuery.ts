import { keepPreviousData, useQuery } from '@tanstack/react-query';

import getLikes from '@actions/getLike';

const useLikeQuery = (id: number) => {
  const query = useQuery({
    queryKey: ['like', { postId: id }],
    queryFn: () => getLikes(id),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });

  return query;
};

export default useLikeQuery;
