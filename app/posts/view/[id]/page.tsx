import React from 'react';
import { Metadata } from 'next';

import axios from 'axios';
import View from './view';

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const { data } = await axios.get(`http://localhost:3000/api/posts/${params.id}`);
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
