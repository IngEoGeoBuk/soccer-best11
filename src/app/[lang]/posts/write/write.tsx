'use client';

import { useEffect, useState } from 'react';

import { redirect, useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import PlayerListSection from '@components/posts/playerListSection';
import SelectPlayerSection from '@components/posts/selectPlayerSection';
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
        <div className="mb-6">
          <label htmlFor="title">
            <p className="input-top-paragraph">{t('title')}</p>
            <input
              type="text"
              aria-label="title"
              id="title"
              className="title-input"
              placeholder={t('titlePlaceholder')}
              required
              maxLength={30}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <SelectPlayerSection />
        <PlayerListSection />
        <br />
        <div className="mb-6">
          <label htmlFor="description">
            <p className="input-top-paragraph">{t('description')}</p>
            <textarea
              id="description"
              aria-label="description"
              rows={4}
              className="description-textarea"
              placeholder={t('descriptionPlaceholder')}
              required
              maxLength={300}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          className="btn-primary"
          data-testid="create-post-btn"
        >
          {t('submit')}
        </button>
      </form>
    </div>
  );
}

export default Create;
