import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import Create from './write';

jest.mock('next/navigation', () => ({
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
    useSession: jest.fn(() => ({
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: {
          name: '강성우',
          email: 'you3667@vaultmicro.com',
          image: 'https://lh3.googleusercontent.com/a/ACg8ocK2DDbv4myKc_vRIPDJAfg4kkKfn7tr-cSDil4sLvpONw=s96-c',
        },
      },
      status: 'authenticated',
    })),
  };
});

const queryClient = new QueryClient();

beforeAll(() => {
  queryClient.clear();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

beforeEach(() => {
  render(<QueryClientProvider client={queryClient}><Create /></QueryClientProvider>);
});

describe('Submit', () => {
  it('You can\'t create the post without title', async () => {
    const titleInput = screen.getByLabelText('title');
    expect(titleInput).toBeInvalid();
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    expect(titleInput).toBeValid();
  });

  it('You can\'t create the post without description', async () => {
    const descriptionTextarea = screen.getByLabelText('title');
    expect(descriptionTextarea).toBeInvalid();
    fireEvent.change(descriptionTextarea, { target: { value: 'New Description' } });
    expect(descriptionTextarea).toBeValid();
  });
});

describe('PlayerListSection', () => {
  it('If you change the nationality tab, you will see the club teams included in that nationality.', async () => {
    expect(screen.getByTestId('national-GER')).toHaveClass('player-tab-selected');
    expect(screen.getByTestId('national-ENG')).toHaveClass('player-tab');
    expect(screen.getByText('BAY')).toBeInTheDocument();
    expect(screen.getByText('DOR')).toBeInTheDocument();
    expect(screen.queryByText('MCI')).toBeNull();
    expect(screen.queryByText('LIV')).toBeNull();

    // change the nationality
    await userEvent.click(screen.getByTestId('national-ENG'));
    expect(screen.getByTestId('national-GER')).toHaveClass('player-tab');
    expect(screen.getByTestId('national-ENG')).toHaveClass('player-tab-selected');
    expect(screen.queryByText('BAY')).toBeNull();
    expect(screen.queryByText('DOR')).toBeNull();
    expect(screen.getByText('MCI')).toBeInTheDocument();
    expect(screen.getByText('LIV')).toBeInTheDocument();
  });

  it('If you change the club tab, you will see the players included in that club.', async () => {
    expect(screen.getByText('T. Müller')).toBeInTheDocument();
    expect(screen.queryByText('M. Salah')).toBeNull();
    expect(screen.queryByText('M. Salah')).toBeNull();

    // change the nationality
    await userEvent.click(screen.getByTestId('national-ENG'));
    expect(screen.queryByText('T. Müller')).toBeNull();
    expect(screen.getByText('K. De Bruyne')).toBeInTheDocument();
    expect(screen.queryByText('M. Salah')).toBeNull();

    // change the team
    await userEvent.click(screen.getByTestId('club-LIV'));
    expect(screen.queryByText('T. Müller')).toBeNull();
    expect(screen.queryByText('K. De Bruyne')).toBeNull();
    expect(screen.getByText('M. Salah')).toBeInTheDocument();
  });
});

describe('Select Player', () => {
  it('Please select a position card first.', async () => {
    await userEvent.click(screen.getByTestId('list-player-189596'));
    expect(screen.getByText('Please select a position card first.')).toBeInTheDocument();
  });

  it('You can fill the player box by clicking on the position card and selecting the player card.', async () => {
    // no player in selected-player-0.
    expect(screen.getByTestId('selected-player-0')).toHaveTextContent('Name');
    await userEvent.click(screen.getByTestId('selected-player-0'));
    await userEvent.click(screen.getByTestId('list-player-189596'));
    // have a player in selected-player-0.
    expect(screen.getByTestId('selected-player-0')).toHaveTextContent('T. Müller');
  });

  it('You can\'t choose the same player in duplicate.', async () => {
    // no player in selected-player-1.
    expect(screen.getByTestId('selected-player-1')).toHaveTextContent('Name');
    // select selected-player-1 and select T. Müller again
    await userEvent.click(screen.getByTestId('selected-player-1'));
    await userEvent.click(screen.getByTestId('list-player-189596'));
    expect(screen.getByText('You have already chosen the player.')).toBeInTheDocument();
    // no player in selected-player-0 even though you selected the player.
    expect(screen.getByTestId('selected-player-1')).not.toHaveTextContent('T. Müller');
  });

  // it('You must select 11 players to create a post.', async () => {
  //   // close toast box
  //   await userEvent.click(screen.getByTestId('close-toast-danger-btn'));

  //   // fill the text input
  //   const titleInput = screen.getByLabelText('title');
  //   fireEvent.change(titleInput, { target: { value: 'New Title' } });

  //   // fill the description textarea
  //   const descriptionTextarea = screen.getByLabelText('title');
  //   fireEvent.change(descriptionTextarea, { target: { value: 'New Description' } });

  //   // select only 2 players.
  //   await userEvent.click(screen.getByTestId('list-player-209658'));

  //   // click the create btn
  //   fireEvent.click(screen.getByTestId('create-post-btn'));
  //   // expect(screen.getByText('Please select 11 players.')).toBeInTheDocument();
  //   expect(1).toBe(1);
  // });
});
