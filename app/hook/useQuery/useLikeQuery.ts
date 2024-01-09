import { keepPreviousData, useQuery } from '@tanstack/react-query';
import getLikes from '../getLike';

interface Vote {
  like: number;
  clicked: boolean;
}

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
