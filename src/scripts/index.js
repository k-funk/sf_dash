// FIXME: I removed bootstrap's js from being imported. not sure if i was using it. if anything
//  broke, start using reactstrap

// Angular
import 'angular';
import 'angular-animate';
import 'angular-cookies';
import 'angular-messages';
import 'angular-resource';
import 'angular-route';
import 'angular-sanitize';
import 'angular-strap';
import 'angular-touch';
import 'angularjs-geolocation';
import 'ngstorage';
import 'ngreact';

// App
import './app';

// controllers
import './controllers/main';
import './controllers/settings';
import './controllers/nextbus';
import './controllers/weather';

// services
import './services/nextBusSvc';
import './services/weatherSvc';

// directives
import './directives/currenttime';
import './directives/timesincelastupdated';

// filters
import './filters/temperature';
import './filters/weathericonurl';


import '../styles/index.scss';
