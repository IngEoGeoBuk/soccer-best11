import '@testing-library/jest-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import messages from '@/messages/en.json';
import Header from '@components/header/header';
import nextAuthData from '@utils/jest/nextAuthData';
import queryClient from '@utils/jest/queryClient';

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
  useParams() {
    return null;
  },
}));

// https://github.com/nextauthjs/next-auth/discussions/4185
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => nextAuthData),
  };
});

beforeEach(() => {
  queryClient.clear(); // Clear the query client before each test
});

describe('Header', () => {
  // login result
  it('If you are logged in, you can check the logout text.', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          locale="en"
          timeZone="Asia/Seoul"
          messages={messages}
        >
          <Header
            user={{
              name: 'ksw',
              email: 'you3667@gmail.com',
              image: 'sdsdsd',
            }}
          />
        </NextIntlClientProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByText('logout')).toBeInTheDocument();
  });

  // logout result
  it('If you are not logged in, you can check the login text.', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          locale="en"
          timeZone="Asia/Seoul"
          messages={messages}
        >
          <Header user={undefined} />
        </NextIntlClientProvider>
      </QueryClientProvider>,
    );
    // screen.debug();
    expect(screen.getByText('login')).toBeInTheDocument();
  });
});
