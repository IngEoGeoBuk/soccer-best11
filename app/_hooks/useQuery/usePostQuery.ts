import { useQuery } from '@tanstack/react-query';

import getPost from '@actions/getPost';

const usePostQuery = (id: number) => {
  const query = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
    staleTime: 1000 * 60 * 1,
  });
  return query;
};

export default usePostQuery;
