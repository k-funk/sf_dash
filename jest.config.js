module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  testMatch: [
    '**/src/**/?(*.)test.js?(x)',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [],
  collectCoverageFrom: [
    '**/src/**/*.{jsx,js}',
  ],
};
