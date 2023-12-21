'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { useParams, redirect, useRouter } from 'next/navigation';
import {
  keepPreviousData, useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query';
import AlertBox from '@/app/components/common/alertBox';
import { UpdatePost, ViewPlayer, ViewPost } from '@/app/types/Post';
import usePostStore from '@/app/store/post';
import PostDetailSkeleton from '../../components/skeleton';
import SelectPlayerSection from '../../components/selectPlayerSection';
import PlayerListSection from '../../components/playerListSection';

async function getPost(id: string) {
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
}

function Index() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signIn');
    },
  });

  const {
    selectedPlayers,
    updateSelectedPlayers,
    updateToastMessage,
    resetPost,
  } = usePostStore((store) => store);

  const { isLoading, error, data } = useQuery<ViewPost>({
    queryKey: ['posts', id],
    queryFn: () => getPost(id as string),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 1,
  });

  const queryClient = useQueryClient();
  const updatePost = async (post: UpdatePost) => axios.put(`/api/posts/${id}`, post);
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
      resetPost();
      router.push(`/posts/view/${id}`);
    },
    onError: (err: Error) => {
      throw err;
    },
  });

  const [title, setTitle] = useState<string>(data?.title!);
  const [description, setDescription] = useState<string>(data?.description!);
  const [initialSelectedPlayers, setInitialSelectedPlayers] = useState<ViewPlayer[]>([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (selectedPlayers.length < 11) {
      updateToastMessage('Please select 11 players.');
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
      setInitialSelectedPlayers(data.players);
      updateSelectedPlayers(data.players);
    }
  }, [data?.players, updateSelectedPlayers]);

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (error) {
    return <AlertBox />;
  }

  if (session?.user?.email !== data?.email) {
    // 다른 사람 게시글 수정 들어갈 경우 로그인 페이지로 이동시키기.
    router.push('/signIn');
  }

  if (data) {
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
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your descriptions here..."
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

  return null;
}

export default Index;
