// 추천 취소 기능 안 넣는 이유
// 1. request 많아짐 (추천 -> 추천 취소 -> 추천 이렇게 번복하는 사람들 있는데, 그때마다 request)
// 2. 사용자 수 많아 보이게 하기 위해 (추천 수가 많을 수록 좋음)

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import AlertBox from '@components/common/alertBox';
import useLikeQuery from '@hooks/useQuery/useLikeQuery';

import Skeleton from './components/skeleton';
import ToastSection from './components/toastSection';
import VoteBtnSection from './components/voteBtnSection';

import './styles.css';

function Index() {
  const { id } = useParams();
  const t = useTranslations('post.voteBox');
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [showToast, setShowToast] = useState<string>('');

  const { status, data } = useLikeQuery(Number(id));

  const postLike = async () => axios.post('/api/likes', { postId: +id });
  const postLikeMutation = useMutation({
    mutationFn: postLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', { postId: +id }] });
    },
    onError: (err: Error) => {
      throw err;
    },
  });

  const clickLike = async () => {
    if (!session) {
      setShowToast(t('pleaseLogin'));
      setTimeout(() => {
        setShowToast('');
      }, 2000);
    } else if (data?.clicked) {
      setShowToast(t('alreadyLikeIt'));
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
        <VoteBtnSection data={data} clickLike={clickLike} />
        <ToastSection showToast={showToast} />
      </div>
    );
  }

  return null;
}

export default Index;
