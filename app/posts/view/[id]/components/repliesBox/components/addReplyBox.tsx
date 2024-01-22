import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import '@/app/posts/styles.css';

interface Interface {
  showReply: number;
  setShowReply: (value: number) => void;
}

function AddReplyBox({ showReply, setShowReply }: Interface) {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const [value, setValue] = useState<string>('');

  const addReply = async (content: string) =>
    axios.post('/api/replies', { postId: +id, commentId: +showReply, content });
  const addReplyMutation = useMutation({
    mutationFn: addReply,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', { postId: +id }],
      });
      setValue('');
      setShowReply(0);
    },
    onError: (error: Error) => {
      throw error;
    },
  });
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addReplyMutation.mutate(value);
  };
  return (
    <form onSubmit={handleSubmit} data-testid={`add-reply-box-${showReply}`}>
      <div className="lg:ml-12 comment-box">
        <div className="comment-inner-box">
          <textarea
            id="reply"
            rows={4}
            className="comment-textarea"
            placeholder="Write a reply..."
            required
            maxLength={100}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="comment-btn-box">
          <button type="submit" className="btn-primary">
            Add reply
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setShowReply(0);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddReplyBox;
