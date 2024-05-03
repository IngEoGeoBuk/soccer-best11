import { useTranslations } from 'next-intl';
import '@lang/posts/styles.css';

function DeletedCommentItem() {
  const t = useTranslations('post.commentBox');
  return (
    <article className="comment-item-article">
      <footer className="comment-item-footer">
        <div className="sm:flex items-center">
          <p className="comment-item-email-paragraph">{t('deletedComment')}</p>
        </div>
      </footer>
    </article>
  );
}

export default DeletedCommentItem;
