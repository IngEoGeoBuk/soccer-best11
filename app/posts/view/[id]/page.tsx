import React from 'react';
import { Metadata } from 'next';

import axios from 'axios';
import View from './view';

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const url = `${process.env.SOCCER_BEST11_SERVER as string}/api/posts/${params.id}`;
  const { data } = await axios.get(url);
  return {
    title: `${data?.title} - Soccer Best11`,
    description: data?.description,
  };
};

const page = () => (
  <div>
    <View />
  </div>
);

export default page;
