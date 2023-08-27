import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AlertBox from '@/app/components/common/alertBox';

import { ViewComment } from '@/app/types/Comment';
import AddCommentBox from './components/addCommentBox';
import CommentItem from './components/commentItem';
import Modal from './components/modal';
import Skeleton from './components/skeleton';

async function getComments(id: string) {
  const { data } = await axios.get(`/api/posts/comments/${id}`);
  return data;
}

function Index() {
  const { id } = useParams();
  const email = useSession().data?.user?.email;
  const [showModal, setShowModal] = useState<number>(0);

  const { isLoading, error, data } = useQuery<ViewComment[]>({
    queryKey: ['comments', { postId: +id }],
    queryFn: () => getComments(id),
    keepPreviousData: true,
    staleTime: 5000,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <AlertBox />;
  }

  if (data) {
    return (
      <>
        {email && <AddCommentBox />}
        {data?.map((item) => (
          <CommentItem
            key={item.id}
            comment={item}
            setShowModal={setShowModal}
          />
        ))}
        {showModal !== 0 && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </>
    );
  }
}

export default Index;
