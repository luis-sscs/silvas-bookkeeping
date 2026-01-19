module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/models/index.js',
    '!src/seeders/**',
    '!src/migrations/**'
  ],
  verbose: true,
  setupFiles: ['<rootDir>/tests/setup.js']
};
