// https://stackoverflow.com/questions/76388994/next-js-13-4-and-nextauth-type-error-authoptions-is-not-assignable-to-type-n
// Luk 답변
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../libs/prismadb';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma!),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
