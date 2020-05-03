module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  setupFiles: ['./jest.test-env.js'],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleDirectories: [
    'node_modules',
    'src/js',
  ],
  testMatch: [
    '**/src/**/?(*.)test.js?(x)',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.{jsx,js}',
  ],
  coverageThreshold: {
    global: {
      statements: 73,
      branches: 72,
      functions: 64,
      lines: 74,
    },
  },
};
