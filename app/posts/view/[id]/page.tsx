'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Post } from '@prisma/client';
import PostDetailSkeleton from '@/app/posts/view/[id]/components/skeleton';
import dateFormat from '@/app/hook/dateFormat';
import AlertBox from '@/app/components/common/alertBox';
import VoteBox from './components/VoteBox';
import CommentBox from './components/commentBox';
import Modal from './components/modal';

interface ViewPost extends Post {
  email: string;
}

async function getPost(id: string) {
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
}

function Index() {
  const { id } = useParams();
  const email = useSession().data?.user?.email;

  const { isLoading, error, data } = useQuery<ViewPost>({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (error) {
    return <AlertBox />;
  }

  if (data) {
    return (
      <>
        <div className="p-5">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Title</h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {data.updatedAt ? `${dateFormat(data.updatedAt)} (Edited)` : dateFormat(data.createdAt)}
            </p>
          </div>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{data.title}</p>
          <br />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{data.description}</p>
          <br />
          <VoteBox />
          <CommentBox />
          {email === data.email && (
            <div className="text-right">
              <Link href={`/posts/modify/${id}`} className="btn-secondary">modify</Link>
              <button
                className="btn-primary"
                type="button"
                onClick={() => setShowModal(true)}
              >
                delete
              </button>
            </div>
          )}
        </div>
        {showModal && (
          <Modal
            setShowModal={setShowModal}
          />
        )}
      </>
    );
  }
}

export default Index;
