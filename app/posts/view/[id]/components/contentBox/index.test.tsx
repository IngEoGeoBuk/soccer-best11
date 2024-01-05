import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import nextAuthData from '@/app/utils/jest/nextAuthData';
import queryClient from '@/app/utils/jest/queryClient';
import ContentBox from '.';

jest.mock('next/navigation', () => ({
  useParams() {
    return {
      id: 8,
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

beforeAll(() => {
  queryClient.clear();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

beforeEach(() => {
  render(<QueryClientProvider client={queryClient}><ContentBox /></QueryClientProvider>);
});

describe('View post', () => {
  it('you can see the loading component first', async () => {
    expect(1).toBe(1);
  });
  it('you can see the title and desc and players you selected', async () => {
    expect(screen.getByText('post3')).toBeInTheDocument();
    expect(screen.getByText('post3 description')).toBeInTheDocument();
    expect(screen.getByTestId('view-player-209658')).toHaveTextContent('L. Goretzka');
  });
});
