import axios from 'axios';

const getPlayersByClub = async (club: string) => {
  const { data } = await axios.get(`/api/players?club=${club}`);
  return data;
};

export default getPlayersByClub;
