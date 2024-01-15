'use client';

import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@/app/_components/errorFallback';
import AuthProvider from '@/app/_context/auth-context';

function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default Providers;
