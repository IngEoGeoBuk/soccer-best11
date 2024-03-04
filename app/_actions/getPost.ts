import axios from 'axios';

import { ViewPost } from '@/app/_types/Post';

const getPost = async (id: number): Promise<ViewPost> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SOCCER_BEST11_SERVER as string}/api/posts/${id}`,
  );
  return data;
};

export default getPost;
