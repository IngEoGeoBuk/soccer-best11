import { Inter } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import Footer from '@components/footer';
import Header from '@components/header';
import Providers from '@lang/provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div className="w-full mx-auto max-w-screen-xl">
          <Providers>
            <NextIntlClientProvider
              locale={locale}
              timeZone="Asia/Seoul"
              messages={messages}
            >
              <Header />
              <main>{children}</main>
              <Footer />
            </NextIntlClientProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
