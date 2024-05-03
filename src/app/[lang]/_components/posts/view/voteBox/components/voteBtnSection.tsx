import { Vote } from '@customTypes/Vote';

export default function VoteBtnSection({
  data,
  clickLike,
}: {
  data: Vote;
  clickLike: () => Promise<void>;
}) {
  return (
    <section className="container">
      <button
        data-testid="vote-btn"
        type="button"
        className="btn-primary"
        onClick={async () => clickLike()}
      >
        <div className="svg_paragraph_container">
          <svg
            id="check-voted"
            className={`h-8 w-8 ${data?.clicked ? 'text-yellow-500' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <p>{String(data?.like)}</p>
        </div>
      </button>
    </section>
  );
}
