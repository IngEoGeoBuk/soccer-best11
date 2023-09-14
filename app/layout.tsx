'use client';

import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import Footer from './components/footer';
import Header from './components/header';
import AuthProvider from './context/auth-context';
import ErrorFallback from './components/errorFallback';

const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full mx-auto max-w-screen-xl">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <Header />
                <main>{children}</main>
                <Footer />
                <ReactQueryDevtools initialIsOpen />
              </QueryClientProvider>
            </AuthProvider>
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
