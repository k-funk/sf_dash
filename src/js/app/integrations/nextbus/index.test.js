import NextBus from 'app/integrations/nextbus';
import { SAMPLE_PREDICTIONS_XML } from 'sample_data/nextbus';


test('xml parsing', () => {
  expect(NextBus.parseXMLResponse(SAMPLE_PREDICTIONS_XML)).toMatchSnapshot();
});
