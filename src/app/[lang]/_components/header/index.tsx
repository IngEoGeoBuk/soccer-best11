import { getServerSession } from 'next-auth/next';

import authOptions from '@utils/authOptions';

import Header from './header';

export default async function Index() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return <Header user={user} />;
}
