import React, { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import EditFrame from '../../editFrame';

interface Interface {
  defaultValue: string;
  showModify: number;
  setShowModify: (value: number) => void;
}

function EditCommentBox({ defaultValue, showModify, setShowModify } : Interface) {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [value, setValue] = useState<string>(defaultValue);

  const updateComment = async (content: string) => axios.put(`/api/comments/${showModify}`, {
    content,
  });
  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { postId: +id }] });
      setShowModify(0);
      setValue('');
    },
    onError: (err: Error) => {
      throw err;
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateCommentMutation.mutate(value);
  };

  return (
    <EditFrame
      id={showModify}
      handleSubmit={handleSubmit}
      type="comment"
      value={value}
      setValue={setValue}
      cancelFunc={() => {
        setShowModify(0);
        setValue('');
      }}
    />
  );
}

export default EditCommentBox;
