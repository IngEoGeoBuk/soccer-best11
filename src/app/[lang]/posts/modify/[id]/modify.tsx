'use client';

import { useState, useEffect } from 'react';

import { useParams, redirect, useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import AlertBox from '@components/common/alertBox';
import PostDetailSkeleton from '@components/posts/common/skeleton';
import DescriptionSection from '@components/posts/write/descriptionSection';
import PlayerListSection from '@components/posts/write/playerListSection';
import SelectPlayerSection from '@components/posts/write/selectPlayerSection';
import SubmitBtn from '@components/posts/write/submitBtn';
import TitleSection from '@components/posts/write/titleSection';
import { UpdatePost, ViewPlayer } from '@customTypes/Post';
import usePostQuery from '@hooks/useQuery/usePostQuery';
import usePostStore from '@stores/post';

import '@lang/posts/styles.css';

function Index() {
  const { id } = useParams();
  const router = useRouter();
  const t = useTranslations('post');
  const {
    selectedPlayers,
    updateSelectedPlayers,
    updateToastMessage,
    resetPost,
  } = usePostStore((store) => store);

  const { isLoading, error, data } = usePostQuery(+id);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signIn');
    },
  });

  const queryClient = useQueryClient();
  const updatePost = async (post: UpdatePost) =>
    axios.put(`/api/posts/${id}`, post);
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', +id] });
      resetPost();
      router.push(`/posts/view/${id}`);
    },
    onError: (err: Error) => {
      throw err;
    },
  });

  const [title, setTitle] = useState<string>(data!.title);
  const [description, setDescription] = useState<string>(data!.description);
  const [initialSelectedPlayers] = useState<ViewPlayer[]>(data!.players);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedPlayers.filter((item) => item?.id).length < 11) {
      updateToastMessage(t('select11'));
      document.getElementById('playerListSection')!.scrollIntoView();
      setTimeout(() => {
        updateToastMessage('');
      }, 2000);
    } else {
      const changedPlayers = [];
      for (let i = 0; i < 11; i += 1) {
        if (initialSelectedPlayers[i].id !== selectedPlayers[i]!.id) {
          changedPlayers.push({
            postPlayerId: initialSelectedPlayers[i].postPlayerId,
            changedId: selectedPlayers[i]!.id,
          });
        }
      }
      updatePostMutation.mutate({
        title,
        description,
        changedPlayers,
      });
    }
  };

  useEffect(() => {
    if (data?.players) {
      updateSelectedPlayers(data.players);
    }
  }, [data, updateSelectedPlayers]);

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (error) {
    return <AlertBox />;
  }

  if (session?.user!.email && session.user.email !== data!.email) {
    // 다른 사람 게시글 수정 들어갈 경우 로그인 페이지로 이동시키기.
    router.push('/signIn');
  }

  if (data) {
    return (
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <TitleSection title={title} handleTitleChange={handleTitleChange} />
          <SelectPlayerSection />
          <PlayerListSection />
          <DescriptionSection
            description={description}
            handleDescriptionChange={handleDescriptionChange}
          />
          <SubmitBtn testId="modify-post-btn" />
        </form>
      </div>
    );
  }

  return null;
}

export default Index;
