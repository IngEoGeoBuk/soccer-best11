import { useParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import ModalFrame from '@components/posts/view/modalFrame';

interface Interface {
  showModal: number;
  setShowModal: (value: number) => void;
}

function Modal({ showModal, setShowModal }: Interface) {
  const { id } = useParams();
  const t = useTranslations('post.replyBox');

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

  if (showModal !== 0) {
    return (
      <ModalFrame
        body={t('deleteReplyDesc')}
        hideModal={() => setShowModal(0)}
        deleteMutation={() => deleteReplyMutation.mutate()}
      />
    );
  }
}

export default Modal;
