import axios from 'axios';

import { Vote } from '@customTypes/Vote';

const getLikes = async (id: number, userId?: string): Promise<Vote> => {
  const parameter = userId ? `?userId=${userId}` : '';

  const { data } = await axios.get(
    `${
      process.env.NEXT_PUBLIC_SOCCER_BEST11_SERVER as string
    }/api/posts/likes/${id}${parameter}`,
  );
  return data;
};

export default getLikes;
