import axios from 'axios';

const getPost = async (id: number) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SOCCER_BEST11_SERVER as string}/api/posts/${id}`,
  );
  return data;
};

export default getPost;
