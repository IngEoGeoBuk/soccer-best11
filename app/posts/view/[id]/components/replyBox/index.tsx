import React, { useState } from 'react';
import { ViewReply } from '@/app/types/Reply';
import ReplyItem from './components/replyItem';

import Modal from './components/modal';

interface Interface {
  replies: ViewReply[];
}

function Index({ replies } : Interface) {
  const [showModal, setShowModal] = useState<number>(0);

  return (
    <>
      {replies.map((item) => (
        <ReplyItem
          key={item.id}
          reply={item}
          setShowModal={setShowModal}
        />
      ))}
      {showModal !== 0 && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

export default Index;
