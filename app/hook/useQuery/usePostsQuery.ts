import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getPosts(nextLastId: number, type: string, search: string) {
  const typeQuery = type ? `&type=${type}` : '';
  const searchQuery = search ? `&search=${search}` : '';
  const { data } = await axios.get(`/api/posts?id=${nextLastId}${typeQuery}${searchQuery}`);
  return data;
}

const usePostsQuery = (type: string, search: string) => {
  const query = useInfiniteQuery({
    queryKey: ['posts', { type }, { search }],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getPosts(pageParam, type, search),
    getNextPageParam: (lastPage) => lastPage.nextLastId ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    placeholderData: keepPreviousData,
  });
  return query;
};

export default usePostsQuery;
