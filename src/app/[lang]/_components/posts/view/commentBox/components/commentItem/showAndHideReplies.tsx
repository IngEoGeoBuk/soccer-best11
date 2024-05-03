import { useTranslations } from 'next-intl';

export default function ShowAndHideReplies({
  repliesCount,
  commentId,
  showReplies,
  toggleShowReplies,
}: {
  repliesCount: number;
  commentId: number;
  showReplies: boolean;
  toggleShowReplies: () => void;
}) {
  const t = useTranslations('post.commentBox');

  if (repliesCount !== 0) {
    return (
      <div className="flex items-center mt-2 space-x-4">
        <button
          data-testid={`show-replies-${commentId}`}
          type="button"
          className="flex items-center text-sm gray-text hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
          onClick={toggleShowReplies}
        >
          <svg
            className="mr-1 w-2 h-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 10"
          >
            {showReplies ? (
              <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
            ) : (
              <path d="M9.207 1A2 2 0 0 0 6.38 1L.793 6.586A2 2 0 0 0 2.207 10H13.38a2 2 0 0 0 1.414-3.414L9.207 1Z" />
            )}
          </svg>
          {repliesCount} {t('replies')}
        </button>
      </div>
    );
  }
}
