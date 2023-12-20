// https://medium.com/@Pavan_/nextjs-set-up-with-jest-testing-library-and-cypress-ac416510768f
const nextJest = require('next/jest');

// Provide the path to your Next.js app to load next.config.js
// and .env files in your test environment
const createJestConfig = nextJest({ dir: './' });

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
};

// createJestConfig is exported this way to ensure
// that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
