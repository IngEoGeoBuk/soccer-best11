import { keepPreviousData, useQuery } from '@tanstack/react-query';

import getLikes from '@actions/getLikes';

const useLikeQuery = (id: number) => {
  const query = useQuery({
    queryKey: ['like', { postId: id }],
    queryFn: () => getLikes(id),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useLikeQuery;
