import { useTranslations } from 'next-intl';

export default function SubmitBtn({ testId }: { testId: string }) {
  const t = useTranslations('post');

  return (
    <button type="submit" className="btn-primary" data-testid={testId}>
      {t('submit')}
    </button>
  );
}
