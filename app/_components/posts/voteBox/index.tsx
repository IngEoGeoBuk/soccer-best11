// 추천 취소 기능 안 넣는 이유
// 1. request 많아짐 (추천 -> 추천 취소 -> 추천 이렇게 번복하는 사람들 있는데, 그때마다 request)
// 2. 사용자 수 많아 보이게 하기 위해 (추천 수가 많을 수록 좋음)

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import AlertBox from '@components/common/alertBox';
import Skeleton from '@components/posts/voteBox/skeleton';
import useLikeQuery from '@hooks/useQuery/useLikeQuery';

import '@components/posts/voteBox/styles.css';

function Index() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [showToast, setShowToast] = useState<string>('');

  const { status, data } = useLikeQuery(Number(id));

  const postLike = async () => axios.post('/api/likes', { postId: +id });
  const postLikeMutation = useMutation({
    mutationFn: postLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like', { postId: +id }] });
    },
    onError: (err: Error) => {
      throw err;
    },
  });

  const clickLike = async () => {
    if (!session) {
      setShowToast('Please login.');
      setTimeout(() => {
        setShowToast('');
      }, 2000);
    } else if (data?.clicked) {
      setShowToast('You have already liked it.');
      setTimeout(() => {
        setShowToast('');
      }, 2000);
    } else {
      postLikeMutation.mutate();
    }
  };

  if (status === 'pending') {
    return <Skeleton />;
  }

  if (status === 'error') {
    return <AlertBox />;
  }

  if (status === 'success' && data) {
    return (
      <div
        data-testid={`vote-box-${id}`}
        className="w-full flex flex-col items-center"
      >
        <div className="container">
          <button
            data-testid="vote-btn"
            type="button"
            className="btn-primary"
            onClick={async () => clickLike()}
          >
            <div className="svg_paragraph_container">
              <svg
                id="check-voted"
                className={`h-8 w-8 ${data?.clicked ? 'text-yellow-500' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <p>{String(data?.like)}</p>
            </div>
          </button>
        </div>
        {showToast ? (
          <div
            id="toast-default"
            className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-500"
            role="alert"
          >
            <div className="ml-3 text-sm font-normal">{showToast}</div>
          </div>
        ) : (
          <div style={{ height: '6px' }} />
        )}
        <br />
      </div>
    );
  }

  return null;
}

export default Index;
