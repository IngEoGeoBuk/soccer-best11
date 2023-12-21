export {};

module.exports = {
  get: jest.fn((url) => {
    if (url === '/api/players?club=BAY') {
      return Promise.resolve({
        data: [
          {
            id: 189596,
            name: 'T. Müller',
            nationality: 'GER',
            club: 'BAY',
          },
          {
            id: 209658,
            name: 'L. Goretzka',
            nationality: 'GER',
            club: 'BAY',
          },
          {
            id: 212622,
            name: 'J. Kimmich',
            nationality: 'GER',
            club: 'BAY',
          },
          {
            id: 167495,
            name: 'M. Neuer',
            nationality: 'GER',
            club: 'BAY',
          },
          {
            id: 229558,
            name: 'D. Upamecano',
            nationality: 'FRA',
            club: 'BAY',
          },
          {
            id: 213345,
            name: 'K. Coman',
            nationality: 'FRA',
            club: 'BAY',
          },
          {
            id: 235243,
            name: 'M. de Ligt',
            nationality: 'NED',
            club: 'BAY',
          },
          {
            id: 234396,
            name: 'A. Davies',
            nationality: 'Canada',
            club: 'BAY',
          },
          {
            id: 222492,
            name: 'L. Sané',
            nationality: 'GER',
            club: 'BAY',
          },
          {
            id: 256790,
            name: 'J. Musiala',
            nationality: 'GER',
            club: 'BAY',
          },
          {
            id: 268421,
            name: 'M. Tel',
            nationality: 'FRA',
            club: 'BAY',
          },
        ],
      });
    }
    if (url === '/api/players?club=MCI') {
      return Promise.resolve({
        data: [
          {
            id: 192985,
            name: 'K. De Bruyne',
            nationality: 'Belgium',
            club: 'MCI',
          },
          {
            id: 210514,
            name: 'João Cancelo',
            nationality: 'POR',
            club: 'MCI',
          },
          {
            id: 188377,
            name: 'K. Walker',
            nationality: 'ENG',
            club: 'MCI',
          },
          {
            id: 186942,
            name: 'İ. Gündoğan',
            nationality: 'GER',
            club: 'MCI',
          },
        ],
      });
    }
    if (url === '/api/players?club=LIV') {
      return Promise.resolve({
        data: [
          {
            id: 231281,
            name: 'T. Alexander-Arnold',
            nationality: 'ENG',
            club: 'LIV',
          },
          {
            id: 209331,
            name: 'M. Salah',
            nationality: 'Egypt',
            club: 'LIV',
          },
          {
            id: 189509,
            name: 'Thiago',
            nationality: 'ESP',
            club: 'LIV',
          },
          {
            id: 183711,
            name: 'J. Henderson',
            nationality: 'ENG',
            club: 'LIV',
          },

        ],
      });
    }
    return null;
  }),
  post: jest.fn((url) => {
    if (url === '/api/posts') {
      return Promise.resolve({
        data: 'post created',
      });
    }
    return null;
  }),
};
