import '@lang/posts/styles.css';
import { useTranslations } from 'next-intl';

interface Interface {
  id: number;
  handleSubmit: (event: React.FormEvent) => void;
  type: string;
  value: string;
  setValue: (value: string) => void;
  cancelFunc: () => void;
}

function EditFrame({
  id,
  handleSubmit,
  type,
  value,
  setValue,
  cancelFunc,
}: Interface) {
  const t = useTranslations('post.editFrame');

  return (
    <form onSubmit={handleSubmit} data-testid={`edit-${type}-${id}-form`}>
      <div className="w-full comment-box">
        <div className="comment-inner-box">
          <textarea
            id={type}
            rows={4}
            className="comment-textarea"
            placeholder={t(`placeholder.${type}`)}
            required
            maxLength={100}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="comment-btn-box">
          <button type="submit" className="btn-primary">
            {t(`edit.${type}`)}
          </button>
          <button
            type="button"
            className="btn-secondary"
            data-testid={`edit-${type}-${id}-no-btn`}
            onClick={() => cancelFunc()}
          >
            {t(`cancel`)}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditFrame;
