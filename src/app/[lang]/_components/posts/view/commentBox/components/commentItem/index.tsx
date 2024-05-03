/* eslint-disable import/order */
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import RepliesBox from '@components/posts/view/replyBox';
import AddReplyBox from '@components/posts/view/replyBox/components/addReplyBox';
import { ViewComment } from '@customTypes/Comment';
import dateFormat from '@utils/dateFormat';

import DeletedCommentItem from './deletedCommentItem';
import ModifyAndDeleteSection from './modifyAndDeleteSection';
import AddReplyBtn from './addReplyBtn';
import EditOrViewCommentSection from './editOrViewCommentSection';

import '@lang/posts/styles.css';
import ShowAndHideReplies from './showAndHideReplies';

interface Interface {
  comment: ViewComment;
  setShowModal: (value: number) => void;
  email: string | undefined;
}

function CommentItem({ comment, setShowModal, email }: Interface) {
  const t = useTranslations('post.commentBox');
  const [showModify, setShowModify] = useState<number>(0);
  const [showReply, setShowReply] = useState<number>(0);
  const [showReplies, setShowReplies] = useState<boolean>(false);

  return (
    <div data-testid={`comment-${comment.id}`}>
      {comment.deletedAt ? (
        <DeletedCommentItem />
      ) : (
        <>
          <article className="comment-item-article">
            <footer className="comment-item-footer">
              <div className="sm:flex items-center">
                <p className="comment-item-email-paragraph">{comment.email}</p>
                <p className="comment-item-date-paragraph">
                  <time>
                    {comment.updatedAt
                      ? `${dateFormat(comment.createdAt)} (${t('edited')})`
                      : dateFormat(comment.createdAt)}
                  </time>
                </p>
              </div>
              <ModifyAndDeleteSection
                isShow={email === comment.email}
                id={comment.id}
                showModify={() => setShowModify(comment.id)}
                showModal={() => setShowModal(comment.id)}
              />
            </footer>
            <EditOrViewCommentSection
              commentId={comment.id}
              defaultValue={comment.content}
              showModify={showModify}
              setShowModify={setShowModify}
            />
            <AddReplyBtn
              isShow={Boolean(email)}
              showReply={() => setShowReply(comment.id)}
            />
            <ShowAndHideReplies
              repliesCount={comment.repliesCount}
              commentId={comment.id}
              showReplies={showReplies}
              toggleShowReplies={() => setShowReplies(!showReplies)}
            />
          </article>
          <AddReplyBox
            isShow={showReply === comment.id}
            showReply={showReply}
            setShowReply={setShowReply}
          />
        </>
      )}
      <RepliesBox
        commentId={comment.id}
        isShow={comment.repliesCount !== 0 && showReplies}
      />
    </div>
  );
}

export default CommentItem;
