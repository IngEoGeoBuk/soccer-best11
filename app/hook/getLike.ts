import axios from 'axios';

const getLikes = async (id: number) => {
  const { data } = await axios.get(`/api/posts/likes/${id}`);
  return data;
};

export default getLikes;
