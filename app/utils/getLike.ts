import axios from 'axios';

const getLikes = async (id: number) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SOCCER_BEST11_SERVER as string}/api/posts/likes/${id}`);
  return data;
};

export default getLikes;
