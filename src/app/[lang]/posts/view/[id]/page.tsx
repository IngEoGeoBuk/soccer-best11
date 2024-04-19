import { redirect } from 'next/navigation';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { getTranslations } from 'next-intl/server';

import getComments from '@actions/getComments';
import getLikes from '@actions/getLikes';
import getPost from '@actions/getPost';
import getQueryClient from '@actions/getQueryClient';
import authOptions from '@utils/authOptions';

import View from './view';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'post.metadata',
  });

  const url = `${
    process.env.NEXT_PUBLIC_SOCCER_BEST11_SERVER as string
  }/api/posts/${params.id}`;

  try {
    const { data } = await axios.get(url);

    return {
      title: t('title', { title: data.title }),
      description: t('description', { description: data.description }),
    };
  } catch (error) {
    return redirect('/');
  }
}

export default async function ViewPage({ params }: { params: { id: number } }) {
  // replies는 prefetch 제외
  const session: any = await getServerSession(authOptions);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', +params.id],
    queryFn: () => getPost(+params.id),
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['comments', { postId: +params.id }],
    queryFn: ({ pageParam }) => getComments(+params.id, pageParam),
    initialPageParam: 0,
  });
  await queryClient.prefetchQuery({
    queryKey: ['likes', { postId: +params.id }],
    queryFn: () => getLikes(+params.id, session?.user?.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <View session={session} />
    </HydrationBoundary>
  );
}
