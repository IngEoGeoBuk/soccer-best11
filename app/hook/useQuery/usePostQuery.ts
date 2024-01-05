import { ViewPost } from '@/app/types/Post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getPost(id: string) {
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
}

const usePostQuery = (id: string) => {
  const query = useQuery<ViewPost>({
    queryKey: ['posts', id],
    queryFn: () => getPost(id as string),
    staleTime: 1000 * 60 * 1,
  });
  return query;
};

export default usePostQuery;
