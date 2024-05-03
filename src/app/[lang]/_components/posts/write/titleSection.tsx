import { useTranslations } from 'next-intl';

export default function TitleSection({
  title,
  handleTitleChange,
}: {
  title: string;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const t = useTranslations('post');

  return (
    <div className="mb-6">
      <label htmlFor="title">
        <p className="input-top-paragraph">{t('title')}</p>
        <input
          type="text"
          aria-label="title"
          id="title"
          className="title-input"
          placeholder={t('titlePlaceholder')}
          required
          maxLength={30}
          value={title}
          onChange={handleTitleChange}
        />
      </label>
    </div>
  );
}
