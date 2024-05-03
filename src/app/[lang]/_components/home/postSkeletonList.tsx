import '@lang/home/styles.css';

function PostSkeleton() {
  return (
    <div role="status" className="post-button animate-pulse">
      <div className="champs-img-box">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <div className="h-2.5 skeleton-line-box w-24 mb-2" />
          <div className="h-2.5 skeleton-line-box w-24 mb-4" />
          <div className="h-2 skeleton-line-box w-36 mb-2" />
          <div className="h-2 skeleton-line-box w-36 mb-2" />
          <div className="h-2 skeleton-line-box w-36" />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function PostSkeletonList() {
  return (
    <div className="w-full" data-testid="home-loading">
      <div className="post-list-box">
        {Array(6)
          .fill('d')
          .map((_, index) => index + 1)
          .map((v) => (
            <PostSkeleton key={v} />
          ))}
      </div>
    </div>
  );
}

export default PostSkeletonList;
