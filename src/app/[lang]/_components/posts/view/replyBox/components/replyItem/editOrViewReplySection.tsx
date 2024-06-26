import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import EditFrame from '@components/posts/view/editFrame';

function EditOrViewReplySection({
  replyId,
  defaultValue,
  showModify,
  setShowModify,
}: {
  replyId: number;
  defaultValue: string;
  showModify: number;
  setShowModify: (value: number) => void;
}) {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [value, setValue] = useState<string>(defaultValue);

  const updateReply = async (content: string) =>
    axios.put(`/api/replies/${showModify}`, {
      content,
    });
  const updateReplyMutation = useMutation({
    mutationFn: updateReply,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', { postId: +id }],
      });
      setShowModify(0);
      setValue('');
    },
    onError: (err: Error) => {
      throw err;
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateReplyMutation.mutate(value);
  };

  if (replyId === showModify) {
    return (
      <EditFrame
        id={showModify}
        handleSubmit={handleSubmit}
        type="reply"
        value={value}
        setValue={setValue}
        cancelFunc={() => {
          setShowModify(0);
          setValue('');
        }}
      />
    );
  }
  return <p className="gray-text">{defaultValue}</p>;
}

export default EditOrViewReplySection;
