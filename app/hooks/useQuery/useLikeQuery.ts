import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Vote } from '@/app/types/Vote';
import getLikes from '@/app/utils/getLike';

const useLikeQuery = (id: number) => {
  const query = useQuery<Vote>({
    queryKey: ['like', { postId: id }],
    queryFn: () => getLikes(id),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });

  return query;
};

export default useLikeQuery;
