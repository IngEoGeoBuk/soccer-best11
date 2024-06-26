import '@components/posts/view/voteBox/styles.css';

function Skeleton() {
  return (
    <div data-testid="vote-box-loading">
      <div className="container animate-pulse">
        <div className="btn-primary cursor-default">
          <div className="svg_paragraph_container">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            <p>0</p>
          </div>
        </div>
      </div>
      <div style={{ height: '56px' }} />
    </div>
  );
}

export default Skeleton;
