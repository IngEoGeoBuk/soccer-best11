import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import Header from './header';
import nextAuthData from '../utils/jest/nextAuthData';
import queryClient from '../utils/jest/queryClient';

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
    useSession: jest.fn(() => (nextAuthData)),
    // // no login spec
    // data: null,
    // status: 'unauthenticated',
  };
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
