import '@testing-library/jest-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import comments from '@/app/__mocks__/post/comments.json';
import CommentBox from '@components/posts/commentBox';
import useCommentsQuery from '@hooks/useQuery/useCommentsQuery';
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

const mockedUseCommentsQuery = useCommentsQuery as jest.Mock<any>;
jest.mock('../../../_hooks/useQuery/useCommentsQuery');

beforeAll(() => {
  queryClient.clear();
  mockedUseCommentsQuery.mockImplementation(() => ({ isLoading: true }));
});

beforeEach(() => {
  mockedUseCommentsQuery.mockImplementation(() => ({
    status: 'success',
    data: {
      pages: [
        {
          data: comments,
        },
      ],
      pageParams: [0],
    },
  }));
  render(
    <QueryClientProvider client={queryClient}>
      <CommentBox />
    </QueryClientProvider>,
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('View post', () => {
  it('you can see the loading component first', async () => {
    mockedUseCommentsQuery.mockImplementation(() => ({
      status: 'pending',
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <CommentBox />
      </QueryClientProvider>,
    );
    expect(screen.getByTestId('comment-box-loading')).toBeInTheDocument();
  });
  it('you can see error component if the status is error.', async () => {
    mockedUseCommentsQuery.mockImplementation(() => ({
      status: 'error',
    }));
    render(
      <QueryClientProvider client={queryClient}>
        <CommentBox />
      </QueryClientProvider>,
    );
    expect(screen.getByText('An error has occurred')).toBeInTheDocument();
  });
  it('you can check Edited mark modified comments/replies', async () => {
    expect(screen.getByTestId('comment-1')).not.toHaveTextContent('(Edited)');
    expect(screen.getByTestId('comment-3')).toHaveTextContent('(Edited)');
  });
  it('you can see delete and modify button in comment components only you made', async () => {
    expect(screen.getByTestId('comment-1')).toHaveTextContent('delete');
    expect(screen.getByTestId('comment-1')).toHaveTextContent('modify');
    expect(screen.getByTestId('comment-2')).not.toHaveTextContent('delete');
    expect(screen.getByTestId('comment-2')).not.toHaveTextContent('modify');
  });
  it('you can see delete modal if you click delete comment btn', async () => {
    expect(screen.getByTestId('comment-box-8')).not.toHaveTextContent(
      'Do you want to delete this comment?',
    );
    // click delete comment-1 btn
    await userEvent.click(screen.getByTestId('delete-comment-1'));
    expect(
      screen.getByText('Do you want to delete this comment?'),
    ).toBeInTheDocument();
    // click x button
    await userEvent.click(screen.getByTestId('hide-modal-btn'));
    expect(screen.getByTestId('comment-box-8')).not.toHaveTextContent(
      'Do you want to delete this comment?',
    );
  });
  it('you can see modify comment textarea if you click modify comment btn', async () => {
    await userEvent.click(screen.getByTestId('modify-comment-1'));
    expect(screen.getByTestId('edit-comment-1-form')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('edit-comment-1-no-btn'));
  });
  it('you can see x replies if that comment has replies', async () => {
    expect(screen.getByTestId('comment-1')).toHaveTextContent('8 replies');
    expect(screen.getByTestId('comment-2')).not.toHaveTextContent('replies');
  });
});
