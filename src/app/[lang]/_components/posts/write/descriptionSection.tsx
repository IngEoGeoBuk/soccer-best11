import { useTranslations } from 'next-intl';

export default function DescriptionSection({
  description,
  handleDescriptionChange,
}: {
  description: string;
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}) {
  const t = useTranslations('post');

  return (
    <div className="mb-6 pt-6">
      <label htmlFor="description">
        <p className="input-top-paragraph">{t('description')}</p>
        <textarea
          id="description"
          aria-label="description"
          rows={4}
          className="description-textarea"
          placeholder={t('descriptionPlaceholder')}
          required
          maxLength={300}
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>
    </div>
  );
}
