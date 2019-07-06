import 'bootstrap-sass/assets/javascripts/bootstrap';

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
import 'angular-xml';
import 'angularjs-geolocation';
import 'ngstorage';

// App
import './app';

// templates
// import '../views/main.html';
// import '../views/header.html';
// import '../views/settings.html';

// controllers
import './controllers/main';
import './controllers/settings';
import './controllers/nextbus';
import './controllers/weather';

//services
import './services/nextBusSvc';
import './services/weatherSvc';

// directives
import './directives/timesincelastupdated';
import './directives/currenttime';

//filters
import './filters/weathericonurl';


import '../styles/index.scss';
