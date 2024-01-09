import axios from 'axios';

const getComments = async (id: string, nextLastId: number) => {
  const { data } = await axios.get(`/api/posts/comments/${id}?commentId=${nextLastId}`);
  return data;
};

export default getComments;
