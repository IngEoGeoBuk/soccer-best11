// https://www.js-howto.com/testing-react-query-with-jest-and-react-testing-library/

import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import nextAuthData from '@/app/utils/jest/nextAuthData';
import queryClient from '@/app/utils/jest/queryClient';
import usePostQuery from '@/app/hook/useQuery/usePostQuery';
import post from '../../../../../__mocks__/post/post.json';
import ContentBox from '.';

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
    useSession: jest.fn(() => (nextAuthData)),
  };
});

const mockedUsePostQuery = usePostQuery as jest.Mock<any>;
jest.mock('../../../../../hook/useQuery/usePostQuery');

beforeAll(() => {
  queryClient.clear();
  mockedUsePostQuery.mockImplementation(() => ({ isLoading: true }));
});

describe('View post', () => {
  it('you can see the loading component first', async () => {
    mockedUsePostQuery.mockImplementation(() => ({
      status: 'pending',
    }));
    render(<QueryClientProvider client={queryClient}><ContentBox /></QueryClientProvider>);
    expect(screen.getByTestId('content-box-loading')).toBeInTheDocument();
  });
  it('you can see error component if the status is error.', async () => {
    mockedUsePostQuery.mockImplementation(() => ({
      status: 'error',
    }));
    render(<QueryClientProvider client={queryClient}><ContentBox /></QueryClientProvider>);
    expect(screen.getByText('An error has occurred')).toBeInTheDocument();
  });
  it('you can see post detail if the status is success.', async () => {
    mockedUsePostQuery.mockImplementation(() => ({
      status: 'success',
      data: post,
    }));
    render(<QueryClientProvider client={queryClient}><ContentBox /></QueryClientProvider>);
    expect(screen.getByText('post3')).toBeInTheDocument();
    expect(screen.getByText('post3 description')).toBeInTheDocument();
    expect(screen.getByTestId('view-player-209658')).toHaveTextContent('L. Goretzka');
  });
  it('you can see delete modal if the click the delete the post btn.', async () => {
    mockedUsePostQuery.mockImplementation(() => ({
      status: 'success',
      data: post,
    }));
    render(<QueryClientProvider client={queryClient}><ContentBox /></QueryClientProvider>);
    await userEvent.click(screen.getByTestId('delete-post-btn'));
    expect(screen.getByText('Do you want to delete this post?')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('no-modal-btn'));
    expect(screen.getByTestId('content-box-8')).not.toHaveTextContent('Do you want to delete this post?');
    await userEvent.click(screen.getByTestId('delete-post-btn'));
    await userEvent.click(screen.getByTestId('hide-modal-btn'));
    expect(screen.getByTestId('content-box-8')).not.toHaveTextContent('Do you want to delete this post?');
    // screen.debug(undefined, Infinity);
  });
});
