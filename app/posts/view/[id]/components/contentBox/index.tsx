import React, { useState } from 'react';
import axios from 'axios';
import PostDetailSkeleton from '@/app/posts/components/skeleton';
import AlertBox from '@/app/components/common/alertBox';
import dateFormat from '@/app/hook/dateFormat';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { ViewPost } from '@/app/types/Post';
import Link from 'next/link';
import ViewPlayersSection from './viewPlayersSection';
import Modal from './modal';

async function getPost(id: string) {
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
}

function Index() {
  const { id } = useParams();
  const email = useSession().data?.user?.email;

  const { isLoading, error, data } = useQuery<ViewPost>({
    queryKey: ['posts', id],
    queryFn: () => getPost(id as string),
    staleTime: 1000 * 60 * 1,
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
      <div data-testid={`content-box-${id}`}>
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Title</h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            {data.updatedAt ? `${dateFormat(data.updatedAt)} (Edited)` : dateFormat(data.createdAt)}
          </p>
        </div>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{data.title}</p>
        <br />
        <ViewPlayersSection players={data.players} />
        <br />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{data.description}</p>
        <br />
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
        {showModal && (
        <Modal
          setShowModal={setShowModal}
        />
        )}
        <hr className="h-px mt-2 mb-8 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
    );
  }
  return null;
}

export default Index;
