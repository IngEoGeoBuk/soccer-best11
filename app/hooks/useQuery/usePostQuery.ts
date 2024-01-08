import { ViewPost } from '@/app/types/Post';
import { useQuery } from '@tanstack/react-query';
import getPost from '@/app/utils/getPost';

const usePostQuery = (id: number) => {
  const query = useQuery<ViewPost>({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
    staleTime: 1000 * 60 * 1,
  });
  return query;
};

export default usePostQuery;
