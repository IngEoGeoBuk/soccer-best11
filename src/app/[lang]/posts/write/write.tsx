'use client';

import { useEffect, useState } from 'react';

import { redirect, useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import DescriptionSection from '@components/posts/write/descriptionSection';
import PlayerListSection from '@components/posts/write/playerListSection';
import SelectPlayerSection from '@components/posts/write/selectPlayerSection';
import SubmitBtn from '@components/posts/write/submitBtn';
import TitleSection from '@components/posts/write/titleSection';
import { CreatePost } from '@customTypes/Post';
import usePostStore from '@stores/post';

import '@lang/posts/styles.css';

function Create() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signIn');
    },
  });

  const router = useRouter();
  const t = useTranslations('post');

  const { selectedPlayers, updateToastMessage, resetPost } = usePostStore(
    (store) => store,
  );
  const addPost = async (post: CreatePost) => axios.post('/api/posts', post);
  const addPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      resetPost();
      router.push('/');
    },
    onError: (error: Error) => {
      throw error;
    },
  });

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

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
      addPostMutation.mutate({
        title,
        description,
        playerIds: selectedPlayers.map((item) => item!.id),
      });
    }
  };

  useEffect(() => {
    resetPost();
  }, [resetPost]);

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
        <SubmitBtn testId="create-post-btn" />
      </form>
    </div>
  );
}

export default Create;
