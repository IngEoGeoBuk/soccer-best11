import React from 'react';

import { Metadata } from 'next';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import axios from 'axios';

import getComments from '@/app/_actions/getComments';
import getPost from '@/app/_actions/getPost';
import getQueryClient from '@/app/_actions/getQueryClient';
import { ViewPost } from '@/app/_types/Post';

import View from './view';

type Props = {
  params: { id: number };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const url = `${process.env.NEXT_PUBLIC_SOCCER_BEST11_SERVER as string}/api/posts/${params.id}`;
  const { data } = await axios.get(url);
  return {
    title: `${data?.title} - Soccer Best11`,
    description: data?.description,
  };
};

export default async function ViewPage({ params }: { params: { id: number } }) {
  // replies, likes는 prefetch 제외
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<ViewPost>({
    queryKey: ['posts', +params.id],
    queryFn: () => getPost(+params.id),
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['comments', { postId: +params.id }],
    queryFn: ({ pageParam }) => getComments(+params.id, pageParam),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <View />
    </HydrationBoundary>
  );
}
