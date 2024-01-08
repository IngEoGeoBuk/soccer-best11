import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

function AddCommentBox() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const [value, setValue] = useState<string>('');

  const addComment = async (content: string) => axios.post('/api/comments', { postId: +id, content });
  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { postId: +id }] });
      setValue('');
    },
    onError: (error: Error) => {
      throw error;
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addCommentMutation.mutate(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <textarea
            id="comment"
            rows={4}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
            placeholder="Write a comment..."
            required
            maxLength={100}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Post comment
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddCommentBox;
