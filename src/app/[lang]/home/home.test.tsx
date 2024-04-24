// https://www.js-howto.com/react-query-how-to-test-infinite-query-with-jest-and-react-testing-library/
import '@testing-library/jest-dom';

import 'intersection-observer';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import messages from '@/messages/en.json';
import usePostsQuery from '@hooks/useQuery/usePostsQuery';
import posts from '@mocks/posts.json';
import nextAuthData from '@utils/jest/nextAuthData';
import queryClient from '@utils/jest/queryClient';

import Home from './home';

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
    useSession: jest.fn(() => nextAuthData),
  };
});

const mockedUseUsersQuery = usePostsQuery as jest.Mock<any>;
jest.mock('../../_hooks/useQuery/usePostsQuery');

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
    render(
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          locale="en"
          timeZone="Asia/Seoul"
          messages={messages}
        >
          <Home isLogin />
        </NextIntlClientProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByTestId('home-loading')).toBeInTheDocument();
  });
  it('you can see error component if the status is error.', async () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      status: 'error',
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          locale="en"
          timeZone="Asia/Seoul"
          messages={messages}
        >
          <Home isLogin />
        </NextIntlClientProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByText('An error has occurred')).toBeInTheDocument();
  });
  it('you can see posts after loading.', async () => {
    mockedUseUsersQuery.mockImplementation(() => ({
      status: 'success',
      data: {
        pages: [
          {
            data: posts,
          },
        ],
        pageParams: [0],
      },
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          locale="en"
          timeZone="Asia/Seoul"
          messages={messages}
        >
          <Home isLogin />
        </NextIntlClientProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByTestId('home-success')).toBeInTheDocument();
  });
});
