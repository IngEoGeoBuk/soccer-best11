// https://www.js-howto.com/react-query-how-to-test-infinite-query-with-jest-and-react-testing-library/
import '@testing-library/jest-dom';
import React from 'react';
import 'intersection-observer';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './page';
import usePostsQuery from '../hook/usePostsQuery';
import posts from '../__mocks__/posts.json';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => null,
    };
  },
  redirect() {
    return null;
  },
  useSearchParams() {
    return {
      get: () => null,
    };
  },
}));

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => ({
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
          name: '강성우',
          email: 'you3667@gmail.com',
          image: 'https://lh3.googleusercontent.com/a/ACg8ocKJP_8_zdi8WHxRNSHDePNI5TN3l-X2UnsWDn_9K-4W=s96-c',
        },
      },
      status: 'authenticated',
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

const mockedUseUsersQuery = usePostsQuery as jest.Mock<any>;
jest.mock('../hook/usePostsQuery');

beforeAll(() => {
  queryClient.clear();
  mockedUseUsersQuery.mockImplementation(() => ({ isLoading: true }));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('view posts', () => {
  it('you can see loading component first.', async () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      status: 'pending',
    }));
    render(<QueryClientProvider client={queryClient}><Home /></QueryClientProvider>);
    expect(screen.getByTestId('home-loading')).toBeInTheDocument();
  });
  it('you can see error component if the status is error.', async () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      status: 'error',
    }));
    render(<QueryClientProvider client={queryClient}><Home /></QueryClientProvider>);
    expect(screen.getByText('An error has occurred')).toBeInTheDocument();
  });
  it('you can see posts after loading.', async () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      status: 'success',
      data: {
        pages: [{
          data: posts,
        }],
        pageParams: [0],
      },
    }));
    render(<QueryClientProvider client={queryClient}><Home /></QueryClientProvider>);
    expect(screen.getByTestId('home-success')).toBeInTheDocument();
  });
});
