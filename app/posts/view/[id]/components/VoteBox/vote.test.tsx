// https://www.js-howto.com/testing-react-query-with-jest-and-react-testing-library/

import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import nextAuthData from '@/app/utils/jest/nextAuthData';
import queryClient from '@/app/utils/jest/queryClient';
import useLikeQuery from '@/app/hooks/useQuery/useLikeQuery';

import noLike from '../../../../../__mocks__/post/likes_no.json';
import yesLike from '../../../../../__mocks__/post/likes.json';
import VoteBox from '.';

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
jest.mock('../../../../../hooks/useQuery/useLikeQuery');

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
        <VoteBox />
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
        <VoteBox />
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
        <VoteBox />
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
        <VoteBox />
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
