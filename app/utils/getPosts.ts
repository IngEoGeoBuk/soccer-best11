import axios from 'axios';

const getPosts = async (nextLastId: number, type: string, search: string) => {
  const typeQuery = type ? `&type=${type}` : '';
  const searchQuery = search ? `&search=${search}` : '';
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SOCCER_BEST11_SERVER as string}/api/posts?id=${nextLastId}${typeQuery}${searchQuery}`);
  return data;
};

export default getPosts;
