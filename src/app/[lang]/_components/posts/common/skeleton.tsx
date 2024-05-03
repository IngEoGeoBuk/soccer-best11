function PostDetailSkeleton() {
  return (
    <div
      role="status"
      className="max-w-sm animate-pulse"
      data-testid="content-box-loading"
    >
      <div className="h-2.5 skeleton-line-box w-48 mb-4" />
      <div className="h-2 skeleton-line-box max-w-[360px] mb-2.5" />
      <div className="h-2 skeleton-line-box mb-2.5" />
      <div className="h-2 skeleton-line-box max-w-[330px] mb-2.5" />
      <div className="h-2 skeleton-line-box max-w-[300px] mb-2.5" />
      <div className="h-2 skeleton-line-box max-w-[360px]" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default PostDetailSkeleton;
