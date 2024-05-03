import { useState } from 'react';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { ViewReply } from '@customTypes/Reply';
import dateFormat from '@utils/dateFormat';

import EditOrViewReplySection from './editOrViewReplySection';
import ModifyAndDeleteSection from './modifyAndDeleteSection';

import '@lang/posts/styles.css';

interface Interface {
  reply: ViewReply;
  setShowModal: (value: number) => void;
}

function ReplyItem({ reply, setShowModal }: Interface) {
  const email = useSession().data?.user?.email;
  const t = useTranslations('post.replyBox');

  const [showModify, setShowModify] = useState<number>(0);

  return (
    <article className="comment-item-article ml-6 lg:ml-12">
      <footer className="comment-item-footer">
        <div className="sm:flex items-center">
          <p className="comment-item-email-paragraph">{reply.email}</p>
          <p className="comment-item-date-paragraph">
            <time>
              {reply.updatedAt
                ? `${dateFormat(reply.createdAt)} (${t('edited')})`
                : dateFormat(reply.createdAt)}
            </time>
          </p>
        </div>
        <ModifyAndDeleteSection
          isShow={email === reply.email}
          id={reply.id}
          showModify={() => setShowModify(reply.id)}
          showModal={() => setShowModal(reply.id)}
        />
      </footer>
      <EditOrViewReplySection
        replyId={reply.id}
        defaultValue={reply.content}
        showModify={showModify}
        setShowModify={setShowModify}
      />
    </article>
  );
}

export default ReplyItem;
