import React from 'react';

function DeletedCommentItem() {
  return (
    <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            That comment has been deleted
          </p>
        </div>
      </footer>
    </article>
  );
}

export default DeletedCommentItem;
