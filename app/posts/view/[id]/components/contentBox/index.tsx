import React, { useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useSession } from 'next-auth/react';

import AlertBox from '@/app/_components/common/alertBox';
import usePostQuery from '@/app/_hooks/useQuery/usePostQuery';
import dateFormat from '@/app/_utils/dateFormat';
import PostDetailSkeleton from '@/app/posts/components/skeleton';

import Modal from './modal';
import ViewPlayersSection from './viewPlayersSection';

function Index() {
  const { id } = useParams();
  const email = useSession().data?.user?.email;

  const { status, data } = usePostQuery(+id);

  const [showModal, setShowModal] = useState(false);

  if (status === 'pending') {
    return <PostDetailSkeleton />;
  }

  if (status === 'error') {
    return <AlertBox data-testid="content-box-error" />;
  }

  if (status === 'success' && data) {
    return (
      <div data-testid={`content-box-${id}`}>
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Title
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            {data.updatedAt
              ? `${dateFormat(data.updatedAt)} (Edited)`
              : dateFormat(data.createdAt)}
          </p>
        </div>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {data.title}
        </p>
        <br />
        <ViewPlayersSection players={data.players} />
        <br />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Description
        </h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {data.description}
        </p>
        <br />
        {email === data.email && (
          <div className="text-right">
            <Link href={`/posts/modify/${id}`} className="btn-secondary">
              modify
            </Link>
            <button
              data-testid="delete-post-btn"
              className="btn-primary"
              type="button"
              onClick={() => setShowModal(true)}
            >
              delete
            </button>
          </div>
        )}
        {showModal && <Modal setShowModal={setShowModal} />}
        <hr className="h-px mt-2 mb-8 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
    );
  }
  return null;
}

export default Index;
