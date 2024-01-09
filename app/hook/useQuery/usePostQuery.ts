import { ViewPost } from '@/app/types/Post';
import { useQuery } from '@tanstack/react-query';
import getPost from '../getPost';

const usePostQuery = (id: string) => {
  const query = useQuery<ViewPost>({
    queryKey: ['posts', id],
    queryFn: () => getPost(id as string),
    staleTime: 1000 * 60 * 1,
  });
  return query;
};

export default usePostQuery;
