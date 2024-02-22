import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth/next';

import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';
import authOptions from '@/app/_utils/authOptions';
import Providers from '@/app/provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full mx-auto max-w-screen-xl">
          <Providers>
            <Header user={user} />
            <main>{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
