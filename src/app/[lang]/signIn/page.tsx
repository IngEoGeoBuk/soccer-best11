import { getTranslations } from 'next-intl/server';

import Sign from './signIn';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'signIn.metadata',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

function SignPage() {
  return (
    <div>
      <Sign />
    </div>
  );
}

export default SignPage;
