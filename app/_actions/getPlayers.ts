import { Player } from '@prisma/client';
import axios from 'axios';

const getPlayersByClub = async (club: string): Promise<Player[]> => {
  const { data } = await axios.get(
    `${
      process.env.NEXT_PUBLIC_SOCCER_BEST11_SERVER as string
    }/api/players?club=${club}`,
  );
  return data;
};

export default getPlayersByClub;
