import axios from 'axios';

const getPost = async (id: string) => {
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
};

export default getPost;
