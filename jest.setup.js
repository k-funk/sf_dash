const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const jestLocalStorageMock = require('jest-localstorage-mock');
const axios = require('axios');


jest.mock('axios');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

// inspired by https://github.com/airbnb/enzyme/issues/882
let spyConsoleError;

beforeEach(() => {
  spyConsoleError = jest.spyOn(console, 'error').mockImplementation(message => {
    if (message.toString().startsWith('Warning: Failed prop type:')) {
      throw new Error(message);
    }
  });
});

afterEach(() => {
  spyConsoleError.mockRestore();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});
