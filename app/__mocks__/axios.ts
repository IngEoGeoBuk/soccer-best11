const posts = require('./posts.json');
const BAY = require('./BAY.json');
const MCI = require('./MCI.json');
const LIV = require('./LIV.json');

export {};

module.exports = {
  get: jest.fn((url) => {
    if (url === '/api/players?club=BAY') {
      return Promise.resolve({
        data: BAY,
      });
    }
    if (url === '/api/players?club=MCI') {
      return Promise.resolve({
        data: MCI,
      });
    }
    if (url === '/api/players?club=LIV') {
      return Promise.resolve({
        data: LIV,
      });
    }
    if (url === '/api/posts?id=0') {
      return Promise.resolve({
        data: posts,
      });
    }
    if (url === '/api/posts?id=0&type=my') {
      return Promise.resolve({
        data: posts.filter((item: any) => item.email === 'you3667@gmail.com'),
      });
    }
    if (url === '/api/posts?id=0&search=post1') {
      return Promise.resolve({
        data: posts.filter((item: any) => item.title === 'post 1'),
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
