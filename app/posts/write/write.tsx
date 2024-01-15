'use client';

import React, { useEffect, useState } from 'react';

import { redirect, useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import usePostStore from '@/app/_store/post';
import { CreatePost } from '@/app/_types/Post';

import PlayerListSection from '../components/playerListSection';
import SelectPlayerSection from '../components/selectPlayerSection';

function Create() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/sign');
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const { selectedPlayers, updateToastMessage, resetPost } = usePostStore(
    (store) => store,
  );
  const addPost = async (post: CreatePost) => axios.post('/api/posts', post);
  const addPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['posts'] });
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
      updateToastMessage('Please select 11 players.');
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
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </p>
            <input
              type="text"
              aria-label="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your title here..."
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
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </p>
            <textarea
              id="description"
              aria-label="description"
              rows={4}
              className="block p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your descriptions here..."
              required
              maxLength={300}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          data-testid="create-post-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
