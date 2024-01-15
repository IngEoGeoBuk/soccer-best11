import { useQuery } from '@tanstack/react-query';

import getPost from '@/app/_actions/getPost';
import { ViewPost } from '@/app/_types/Post';

const usePostQuery = (id: number) => {
  const query = useQuery<ViewPost>({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
    staleTime: 1000 * 60 * 1,
  });
  return query;
};

export default usePostQuery;
