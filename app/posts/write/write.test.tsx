import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import nextAuthData from '@/app/utils/jest/nextAuthData';
import queryClient from '@/app/utils/jest/queryClient';
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
    useSession: jest.fn(() => (nextAuthData)),
  };
});

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
    const descriptionTextarea = screen.getByLabelText('description');
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
    // select T. Müller in selected-player-0.
    await userEvent.click(screen.getByTestId('selected-player-0'));
    await userEvent.click(screen.getByTestId('list-player-189596'));

    // no player in selected-player-1.
    expect(screen.getByTestId('selected-player-1')).toHaveTextContent('Name');
    // select selected-player-1 and select T. Müller again
    await userEvent.click(screen.getByTestId('selected-player-1'));
    await userEvent.click(screen.getByTestId('list-player-189596'));
    expect(screen.getByText('You have already chosen the player.')).toBeInTheDocument();
    // no player in selected-player-0 even though you selected the player.
    expect(screen.getByTestId('selected-player-1')).not.toHaveTextContent('T. Müller');
  });

  it('You must select 11 players to create a post.', async () => {
    // fill the text input
    const titleInput = screen.getByLabelText('title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    // fill the description textarea
    const descriptionTextarea = screen.getByLabelText('description');
    fireEvent.change(descriptionTextarea, { target: { value: 'New Description' } });

    // select only 2 players.
    await userEvent.click(screen.getByTestId('selected-player-0'));
    await userEvent.click(screen.getByTestId('list-player-189596'));

    await userEvent.click(screen.getByTestId('selected-player-1'));
    await userEvent.click(screen.getByTestId('list-player-209658'));

    // click the create btn
    await userEvent.click(screen.getByTestId('create-post-btn'));
    // screen.debug(undefined, Infinity);
    expect(screen.getByText('Please select 11 players.')).toBeInTheDocument();

    // [post] api/posts doesn't work.
    expect(axios.post).not.toHaveBeenCalledWith('/api/posts', {});
  });
});

describe('create a post', () => {
  it('fill all condition', async () => {
    const titleInput = screen.getByLabelText('title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    const descriptionTextarea = screen.getByLabelText('description');
    fireEvent.change(descriptionTextarea, { target: { value: 'New Description' } });
    const playerIds = [
      189596,
      209658,
      212622,
      167495,
      229558,
      213345,
      235243,
      234396,
      222492,
      256790,
      268421,
    ];
    async function selectElevenPlayers() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 11; i++) {
        // eslint-disable-next-line no-await-in-loop
        await userEvent.click(screen.getByTestId(`selected-player-${i}`));
        // eslint-disable-next-line no-await-in-loop
        await userEvent.click(screen.getByTestId(`list-player-${playerIds[i]}`));
        // Additional test logic
      }
    }
    await selectElevenPlayers();
    await userEvent.click(screen.getByTestId('create-post-btn'));

    // [post] api/posts works after click submit button.
    expect(axios.post).toHaveBeenCalledWith('/api/posts', {
      title: 'New Title',
      description: 'New Description',
      playerIds,
    });
  });
});
