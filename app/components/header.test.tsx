import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './header';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => null,
    };
  },
  useSearchParams() {
    return {
      get: () => null,
    };
  },
  usePathname() {
    return null;
  },
}));

// https://github.com/nextauthjs/next-auth/discussions/4185
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => ({
      // login spec
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
          name: '강성우',
          email: 'you3667@vaultmicro.com',
          image: 'https://lh3.googleusercontent.com/a/ACg8ocK2DDbv4myKc_vRIPDJAfg4kkKfn7tr-cSDil4sLvpONw=s96-c',
        },
      },
      status: 'authenticated',

      // // no login spec
      // data: null,
      // status: 'unauthenticated',
    })),
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

beforeEach(() => {
  queryClient.clear(); // Clear the query client before each test
  render(<QueryClientProvider client={queryClient}><Header /></QueryClientProvider>);
});

describe('Header', () => {
  // login result
  it('If you are logged in, you can check the logout text.', async () => {
    expect(
      screen.getByText('logout'),
    ).toBeInTheDocument();
  });

  // // logout result
  // it('If you are not logged in, you can check the login text.', async () => {
  //   expect(
  //     screen.getByText('login'),
  //   ).toBeInTheDocument();
  // });
});
