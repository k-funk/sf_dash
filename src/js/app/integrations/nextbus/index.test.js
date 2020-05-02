import { SAMPLE_PREDICTIONS_XML } from 'sample_data/nextbus';

import NextBus from './index';


test('xml parsing', () => {
  expect(NextBus.parseXMLResponse(SAMPLE_PREDICTIONS_XML)).toMatchSnapshot();
});
