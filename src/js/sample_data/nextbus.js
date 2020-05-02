// The data returned is actually in XML, this is just what the X2JS library outputs

export const SAMPLE_PREDICTION = {
  direction: {
    prediction: [
      {
        _epochTime: '1588198229803',
        _seconds: '296',
        _minutes: '4',
        _isDeparture: 'false',
        _dirTag: '14___I_F00',
        _vehicle: '6609',
        _block: '1620',
        _tripTag: '9359239',
        $$hashKey: 'object:19',
      },
      {
        _epochTime: '1588198681179',
        _seconds: '747',
        _minutes: '12',
        _isDeparture: 'false',
        _dirTag: '14___I_F00',
        _vehicle: '6599',
        _block: '1622',
        _tripTag: '9359240',
        $$hashKey: 'object:20',
      }, { _epochTime: '1588199412858', _seconds: '1479', _minutes: '24', _isDeparture: 'false', _dirTag: '14___I_F00', _vehicle: '6547', _block: '1633', _tripTag: '9359237', $$hashKey: 'object:21' }, { _epochTime: '1588199419316', _seconds: '1486', _minutes: '24', _isDeparture: 'false', _dirTag: '14___I_F00', _vehicle: '6533', _block: '1628', _tripTag: '9359243', $$hashKey: 'object:22' }],
    _title: 'Inbound to Ferry Plaza',
  },
  message: [
    {
      _text: 'Service frequency for this stop is 10 minutes or less.',
      _priority: 'Normal',
    },
    {
      _text: 'Muni for essential trips only. Masks or face coverings are required. Practice physical distancing. Visit sfmta.com/COVID19 for more info.',
      _priority: 'Low',
    }, { _text: 'Text COVID19SF to 888-777 for official updates. Visit sfdph.org', _priority: 'Low' }, { _text: 'Board thru rear doors. Front door for accessibility needs only.', _priority: 'Normal' }],
  _agencyTitle: 'SF Muni',
  _routeTitle: '14-Mission',
  _routeTag: '14',
  _stopTitle: 'Mission St & 24th St',
  _stopTag: '5565',
  $$hashKey: 'object:17',
  className: '',
};

// FIXME
export const SAMPLE_FAILED_PREDICTIONS = {

};

export const SAMPLE_PREDICTIONS_XML = `
<?xml version="1.0" encoding="utf-8" ?> 
<body copyright="All data copyright San Francisco Muni 2020.">
  <predictions agencyTitle="SF Muni" routeTitle="12-Folsom-Pacific" routeTag="12" stopTitle="Pacific Ave &amp; Grant Ave" stopTag="5837" dirTitleBecauseNoPredictions="Inbound to Van Ness">
    <message text="Muni for essential trips only. Masks or face coverings are required. Practice physical distancing. Visit sfmta.com/COVID19 for more info." priority="Low"/>
    <message text="Text COVID19SF to 888-777 for official updates. Visit sfdph.org" priority="Low"/>
  </predictions>
  <predictions agencyTitle="SF Muni" routeTitle="14-Mission" routeTag="14" stopTitle="Mission St &amp; 24th St" stopTag="5565">
    <direction title="Inbound to Ferry Plaza">
      <prediction epochTime="1588394902295" seconds="11" minutes="0" isDeparture="false" dirTag="14___I_F00" vehicle="6591" block="1631" tripTag="9359290" />
      <prediction epochTime="1588395526282" seconds="635" minutes="10" isDeparture="false" dirTag="14___I_F00" vehicle="6539" block="1633" tripTag="9359291" />
    </direction>
    <message text="Service frequency for this stop is 10 minutes or less." priority="Normal"/>
    <message text="Muni for essential trips only. Masks or face coverings are required. Practice physical distancing. Visit sfmta.com/COVID19 for more info." priority="Low"/>
    <message text="Text COVID19SF to 888-777 for official updates. Visit sfdph.org" priority="Low"/>
    <message text="Board thru rear doors. Front door for accessibility needs only." priority="Normal"/>
  </predictions>
</body>
`;
