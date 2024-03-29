import axios from 'axios';

import { ViewComment } from '@customTypes/Comment';

const getComments = async (
  id: number,
  nextLastId: number,
): Promise<{
  data: ViewComment[];
  nextLastId?: number;
}> => {
  const { data } = await axios.get(
    `${
      process.env.NEXT_PUBLIC_SOCCER_BEST11_SERVER as string
    }/api/posts/comments/${id}?commentId=${nextLastId}`,
  );
  return data;
};

export default getComments;
