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
  const queryClient = useQueryClient();
  const deleteComment = async () => axios.delete(`/api/comments/${showModal}`);
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
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
  const t = useTranslations('post.commentBox');

  if (showModal !== 0) {
    return (
      <ModalFrame
        body={t('deleteCommentDesc')}
        hideModal={() => setShowModal(0)}
        deleteMutation={() => deleteCommentMutation.mutate()}
      />
    );
  }
}

export default Modal;
