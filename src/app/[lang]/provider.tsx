'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@components/errorFallback';
import AuthProvider from '@context/auth-context';

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default Providers;
