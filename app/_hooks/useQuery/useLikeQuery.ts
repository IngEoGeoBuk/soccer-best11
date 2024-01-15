import { keepPreviousData, useQuery } from '@tanstack/react-query';

import getLikes from '@/app/_actions/getLike';
import { Vote } from '@/app/_types/Vote';

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
