const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
const jestLocalStorageMock = require('jest-localstorage-mock');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');


global.axiosMock = new MockAdapter(axios);

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });


// mock navigator.geolocation for testing
global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};


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
  axiosMock.reset();
});
