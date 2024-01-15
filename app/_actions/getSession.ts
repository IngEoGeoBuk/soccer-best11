import { getServerSession } from 'next-auth';

import authOptions from '@/app/_utils/authOptions';

export default async function getSession() {
  return getServerSession(authOptions);
}
