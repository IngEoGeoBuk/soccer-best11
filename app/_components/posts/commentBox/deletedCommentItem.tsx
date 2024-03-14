import '@/app/posts/styles.css';

function DeletedCommentItem() {
  return (
    <article className="comment-item-article">
      <footer className="comment-item-footer">
        <div className="sm:flex items-center">
          <p className="comment-item-email-paragraph">
            That comment has been deleted
          </p>
        </div>
      </footer>
    </article>
  );
}

export default DeletedCommentItem;
