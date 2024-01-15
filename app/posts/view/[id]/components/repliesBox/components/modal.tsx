import React from 'react';

import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import ModalFrame from '../../modalFrame';

interface Interface {
  showModal: number;
  setShowModal: (value: number) => void;
}

function Modal({ showModal, setShowModal }: Interface) {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const deleteReply = async () => axios.delete(`/api/replies/${showModal}`);
  const deleteReplyMutation = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', { postId: +id }],
      });
      setShowModal(0);
    },
    onError: (error: Error) => {
      throw error;
    },
  });

  return (
    <ModalFrame
      body="Do you want to delete this reply?"
      hideModal={() => setShowModal(0)}
      deleteMutation={() => deleteReplyMutation.mutate()}
    />
  );
}

export default Modal;
