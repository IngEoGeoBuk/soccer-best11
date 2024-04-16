import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import ModalFrame from '@components/posts/modalFrame';

interface Interface {
  setShowModal: (value: boolean) => void;
}

function Modal({ setShowModal }: Interface) {
  const t = useTranslations('post.contentBox');

  const { id } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const deletePost = async () => axios.delete(`/api/posts/${id}`);
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', +id] });
      router.push('/');
    },
    onError: (error: Error) => {
      throw error;
    },
  });

  return (
    <ModalFrame
      body={t('deletePostDesc')}
      hideModal={() => setShowModal(false)}
      deleteMutation={() => deletePostMutation.mutate()}
    />
  );
}

export default Modal;
