// https://www.js-howto.com/testing-react-query-with-jest-and-react-testing-library/

import '@testing-library/jest-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

import messages from '@/messages/en.json';
import VoteBox from '@components/posts/view/voteBox';
import useLikeQuery from '@hooks/useQuery/useLikeQuery';
import yesLike from '@mocks/post/likes.json';
import noLike from '@mocks/post/likes_no.json';
import nextAuthData from '@utils/jest/nextAuthData';
import queryClient from '@utils/jest/queryClient';

jest.mock('next/navigation', () => ({
  useParams() {
    return {
      id: 8,
    };
  },
  useRouter() {
    return {
      push: () => null,
    };
  },
  redirect() {
    return null;
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

const mockedUseLikeQuery = useLikeQuery as jest.Mock<any>;
jest.mock('../../../../../_hooks/useQuery/useLikeQuery');

beforeAll(() => {
  queryClient.clear();
  mockedUseLikeQuery.mockImplementation(() => ({ isLoading: true }));
});

describe('View post', () => {
  it('you can see the loading component first', async () => {
    mockedUseLikeQuery.mockImplementation(() => ({
      status: 'pending',
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          locale="en"
          timeZone="Asia/Seoul"
          messages={messages}
        >
          <VoteBox />
        </NextIntlClientProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByTestId('vote-box-loading')).toBeInTheDocument();
  });
  it('you can see error component if the status is error.', async () => {
    mockedUseLikeQuery.mockImplementation(() => ({
      status: 'error',
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          locale="en"
          timeZone="Asia/Seoul"
          messages={messages}
        >
          <VoteBox />
        </NextIntlClientProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByText('An error has occurred')).toBeInTheDocument();
  });
  it("you can vote If you haven't clicked on it", async () => {
    mockedUseLikeQuery.mockImplementation(() => ({
      status: 'success',
      data: noLike,
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          locale="en"
          timeZone="Asia/Seoul"
          messages={messages}
        >
          <VoteBox />
        </NextIntlClientProvider>
      </QueryClientProvider>,
    );
    const spanElement = screen
      .getByTestId('vote-box-8')
      .querySelector('#check-voted'); // select lower div
    expect(spanElement).not.toHaveClass('text-yellow-500');
  });
  it("you can't vot If you already have clicked on it", async () => {
    mockedUseLikeQuery.mockImplementation(() => ({
      status: 'success',
      data: yesLike,
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          locale="en"
          timeZone="Asia/Seoul"
          messages={messages}
        >
          <VoteBox />
        </NextIntlClientProvider>
      </QueryClientProvider>,
    );
    const spanElement = screen
      .getByTestId('vote-box-8')
      .querySelector('#check-voted'); // select lower div
    expect(spanElement).toHaveClass('text-yellow-500');

    expect(screen.getByTestId('vote-box-8')).not.toHaveTextContent(
      'You have already liked it.',
    );

    // click the like btn
    await userEvent.click(screen.getByTestId('vote-btn'));
    expect(screen.getByText('You have already liked it.')).toBeInTheDocument();
  });
});
