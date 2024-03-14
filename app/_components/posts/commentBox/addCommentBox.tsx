import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import '@/app/posts/styles.css';

function AddCommentBox() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const [value, setValue] = useState<string>('');

  const addComment = async (content: string) =>
    axios.post('/api/comments', { postId: +id, content });
  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', { postId: +id }],
      });
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
      <div className="w-full comment-box">
        <div className="comment-inner-box">
          <textarea
            id="comment"
            rows={4}
            className="comment-textarea"
            placeholder="Write a comment..."
            required
            maxLength={100}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="flex comment-btn-box">
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
