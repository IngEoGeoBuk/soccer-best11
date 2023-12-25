const posts = require('./posts.json');
const BAY = require('./BAY.json');
const MCI = require('./MCI.json');
const LIV = require('./LIV.json');
const post = require('./post/post.json');
const comments = require('./post/comments.json');
const likes = require('./post/likes.json');

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
    if (url === '/api/posts/8') {
      return Promise.resolve({
        data: post,
      });
    }
    if (url === '/api/posts/likes/8') {
      return Promise.resolve({
        data: likes,
      });
    }
    if (url === '/api/posts/comments/8') {
      return Promise.resolve({
        data: comments,
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
