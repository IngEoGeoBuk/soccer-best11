'use client';

import React, { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { CreatePost } from '@/app/types/Post';
import { usePost } from '@/app/context/post.provider';
import SelectPlayerSection from '../components/selectPlayerSection';
import PlayerListSection from '../components/playerListSection';

function Create() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const addPost = async (post: CreatePost) => axios.post('/api/posts', post);
  const addPostMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.resetQueries(['posts']);
      router.push('/');
    },
    onError: (error) => {
      throw error;
    },
  });

  const { selectedPlayers, setToastMessage } = usePost();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (selectedPlayers.length < 11) {
      setToastMessage('Please select 11 players.');
      document.getElementById('playerListSection')!.scrollIntoView();
      setTimeout(() => {
        setToastMessage('');
      }, 2000);
    } else {
      addPostMutation.mutate({
        title,
        description,
        playerIds: selectedPlayers.map((item) => item!.id),
      });
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title">
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</p>
            <input
              type="text"
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
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</p>
            <textarea
              id="description"
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
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>
  );
}

export default Create;
