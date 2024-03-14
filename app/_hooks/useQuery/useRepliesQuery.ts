import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ViewReply } from '@customTypes/Reply';

async function getRepliesByCommentId(
  id: number,
  nextLastId: number,
): Promise<{
  data: ViewReply[];
  nextLastId?: number;
}> {
  const { data } = await axios.get(
    `/api/comments/replies/${id}?replyId=${nextLastId}`,
  );
  return data;
}

const useRepliesQuery = (postId: number, commentId: number) => {
  const query = useInfiniteQuery({
    queryKey: ['comments', { postId, commentId }],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getRepliesByCommentId(commentId, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextLastId ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    placeholderData: keepPreviousData,
  });
  return query;
};

export default useRepliesQuery;
