// import '@testing-library/jest-dom';
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import userEvent from '@testing-library/user-event';
// import View from './view';

// jest.mock('next/navigation', () => ({
//   useParams() {
//     return {
//       id: 8,
//     };
//   },
//   redirect() {
//     return null;
//   },
// }));

// jest.mock('next-auth/react', () => {
//   const originalModule = jest.requireActual('next-auth/react');
//   return {
//     __esModule: true,
//     ...originalModule,
//     useSession: jest.fn(() => ({
//       data: {
//         expires: new Date(Date.now() + 2 * 86400).toISOString(),
//         user: {
//           name: '강성우',
//           email: 'you3667@gmail.com',
//           image: 'https://lh3.googleusercontent.com/a/ACg8ocKJP_8_zdi8WHxRNSHDePNI5TN3l-X2UnsWDn_9K-4W=s96-c',
//         },
//       },
//       status: 'authenticated',
//     })),
//   };
// });

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // ✅ turns retries off
//       retry: false,
//     },
//   },
// });

// beforeAll(() => {
//   queryClient.clear();
//   window.HTMLElement.prototype.scrollIntoView = jest.fn();
// });

// beforeEach(() => {
//   render(<QueryClientProvider client={queryClient}><View /></QueryClientProvider>);
// });

// describe('View post', () => {
//   it('you can see the loading component first', async () => {
//     expect(1).toBe(1);
//   });
//   it('you can see the title and desc and players you selected', async () => {
//     expect(screen.getByText('post3')).toBeInTheDocument();
//     expect(screen.getByText('post3 description')).toBeInTheDocument();
//     expect(screen.getByTestId('view-player-209658')).toHaveTextContent('L. Goretzka');
//   });
//   // it('you can check Edited mark modified comments/replies', async () => {
//   //   expect(screen.getByTestId('comment-1')).not.toHaveTextContent('(Edited)');
//   //   expect(screen.getByTestId('comment-3')).toHaveTextContent('(Edited)');
//   // });
//   // it('you can see delete and modify button in comment components only you made', async () => {
//   //   expect(screen.getByTestId('comment-1')).toHaveTextContent('delete');
//   //   expect(screen.getByTestId('comment-1')).toHaveTextContent('modify');
//   //   expect(screen.getByTestId('comment-2')).not.toHaveTextContent('delete');
//   //   expect(screen.getByTestId('comment-2')).not.toHaveTextContent('modify');
//   // });
//   // it('you can see delete modal if you click delete comment/reply btn', async () => {
//   //   expect(screen.getByTestId('view-post')).not.toHaveTextContent('Do you want to delete this comment?');
//   //   // click delete comment-1 btn
//   //   await userEvent.click(screen.getByTestId('delete-comment-1'));
//   //   expect(screen.getByText('Do you want to delete this comment?')).toBeInTheDocument();
//   //   // click x button
//   //   await userEvent.click(screen.getByTestId('hide-modal-btn'));
//   //   expect(screen.getByTestId('view-post')).not.toHaveTextContent('Do you want to delete this comment?');
//   //   // click delete reply-2 btn
//   //   await userEvent.click(screen.getByTestId('delete-reply-2'));
//   //   expect(screen.getByText('Do you want to delete this reply?')).toBeInTheDocument();
//   //   // click no button
//   //   await userEvent.click(screen.getByTestId('no-modal-btn'));
//   //   expect(screen.getByTestId('view-post')).not.toHaveTextContent('Do you want to delete this reply?');
//   // });
//   // it('you can see add reply box if you click Reply btn in the comment box', async () => {
//   //   await userEvent.click(screen.getByTestId('show-reply-1'));
//   // });
//   // it('you can see modify comment/reply textarea if you click modify comment/reply btn', async () => {
//   //   await userEvent.click(screen.getByTestId('modify-comment-1'));
//   //   expect(screen.getByTestId('edit-comment-1-form')).toBeInTheDocument();
//   //   await userEvent.click(screen.getByTestId('edit-comment-1-no-btn'));

//   //   await userEvent.click(screen.getByTestId('modify-reply-1'));
//   //   expect(screen.getByTestId('edit-reply-1-form')).toBeInTheDocument();
//   //   await userEvent.click(screen.getByTestId('edit-reply-1-no-btn'));
//   // });
//   // it('If you delete a comment with a replies, the comment says That comment has been deleted', async () => {
//   //   expect(screen.getByTestId('comment-4')).toHaveTextContent('That comment has been deleted');
//   // });
// });
