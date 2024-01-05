import axios from 'axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface Vote {
  like: number;
  clicked: boolean;
}

async function getLikes(id: number) {
  const { data } = await axios.get(`/api/posts/likes/${id}`);
  return data;
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
