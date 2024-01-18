import './globals.css';
import { Inter } from 'next/font/google';

import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';

import Providers from './provider';

const inter = Inter({ subsets: ['latin'] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full mx-auto max-w-screen-xl">
          <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
