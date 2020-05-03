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
      statements: 81,
      branches: 80,
      functions: 71,
      lines: 81,
    },
  },
};
