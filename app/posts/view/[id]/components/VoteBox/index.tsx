// 추천 취소 기능 안 넣는 이유
// 1. request 많아짐 (추천 -> 추천 취소 -> 추천 이렇게 번복하는 사람들 있는데, 그때마다 request)
// 2. 사용자 수 많아 보이게 하기 위해 (추천 수가 많을 수록 좋음)

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AlertBox from '@/app/components/common/alertBox';
import Skeleton from './skeleton';

interface Vote {
  like: number;
  clicked: boolean;
}

async function getLikes(id: string) {
  const { data } = await axios.get(`/api/posts/likes/${id}`);
  return data;
}

function Index() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [showToast, setShowToast] = useState<string>('');

  // like 관련 코드
  const { isLoading, error, data } = useQuery<Vote>({
    queryKey: ['like', { postId: +id }],
    queryFn: () => getLikes(id),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const postLike = async () => axios.post('/api/likes', { postId: +id });
  const postLikeMutation = useMutation(postLike, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like', { postId: +id }] });
    },
    onError: (err) => {
      throw err;
    },
  });

  const clickLike = async () => {
    if (!session) {
      setShowToast('Please login.');
      setTimeout(() => {
        setShowToast('');
      }, 1000);
    } else if (data?.clicked) {
      setShowToast('You have already liked it.');
      setTimeout(() => {
        setShowToast('');
      }, 1000);
    } else {
      postLikeMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <Skeleton />
    );
  }

  if (error) {
    return <AlertBox />;
  }

  if (data) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-center gap-5">
          <button
            type="button"
            className="btn-primary"
            onClick={async () => clickLike()}
          >
            <div className="flex flex-col justify-center items-center gap-1">
              <svg className={`h-8 w-8 ${data?.clicked ? 'text-yellow-500' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <p>{String(data?.like)}</p>
            </div>
          </button>
        </div>
        {showToast
          ? (
            <div id="toast-default" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-500" role="alert">
              <div className="ml-3 text-sm font-normal">{showToast}</div>
            </div>
          )
          : <div style={{ height: '56px' }} />}
      </div>
    );
  }
}

export default Index;
