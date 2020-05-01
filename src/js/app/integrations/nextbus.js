import axios from 'axios';
import X2JS from 'x2js';
import qs from 'qs';


export const XML2JS_CONFIG = {
  arrayAccessFormPaths: [
    'body.predictions',
    'body.predictions.direction.prediction',
  ],
};
export const URL = 'http://webservices.nextbus.com/service/publicXMLFeed';

export default class NextBus {
  static getPredictions = async stopRouteTags => {
    const response = await axios({
      method: 'get',
      url: URL,
      params: {
        command: 'predictionsForMultiStops',
        a: 'sf-muni',
        stops: stopRouteTags,
        useShortTitles: true,
      },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    return new X2JS(XML2JS_CONFIG).xml2js(response.data);
  }

  static getRouteConfig = async locations => {
    // return $http.get(URL, {
    //   cache: true,
    //   params: {
    //     command: 'routeConfig',
    //     a: 'sf-muni',
    //     useShortTitles: true,
    //   },
    // })
    //   .then(data => this.mergeRouteData(data.data.body.route));
  }

  static getStopsWithin = async meters => {
    // const key = getLocalStorage(WEATHER_KEY_KEY);
    // const units = this.convertUnitsForDarkSky(getLocalStorage(WEATHER_UNITS_KEY));
    // const responses = await axios.all(
    //   locations.map(({ lat, long }) => (
    //     this.fetchWeatherData({ lat, long, key, units })
    //   )),
    // );
    // return responses;


    // return $q.all([
    //   geolocation.getLocation(),
    //   this.getRouteConfig(),
    // ]).then(promises => {
    //   /** Once we've got both the user's location and the route Data search */
    //   const stopResults = [];
    //   const currPosition = new google.maps.LatLng(
    //     promises[0].coords.latitude,
    //     promises[0].coords.longitude,
    //   );
    //   const routeConfig = promises[1];
    //
    //   routeConfig.forEach(route => {
    //     route.direction.forEach(direction => {
    //       direction.stop.forEach(stop => {
    //         /** Find stops that are within [meters] of the users position */
    //         const stopLatLng = new google.maps.LatLng(stop._lat, stop._lon);
    //         const distance = google.maps.geometry.spherical
    //           .computeDistanceBetween(currPosition, stopLatLng);
    //         if (distance <= meters) {
    //           stopResults.push({
    //             tag: route._tag,
    //             title: route._title,
    //             directionName: direction._name,
    //             directionTitle: direction._title,
    //             latLng: stopLatLng,
    //             stopId: stop._stopId,
    //             stopTag: stop._tag,
    //             stopTitle: stop._title,
    //           });
    //         }
    //       });
    //     });
    //   });
    //
    //   return stopResults;
    // });
  }

  static mergeRouteData = routeData => {
    routeData.forEach(route => {
      // map the stop tags
      const stopTags = {};
      route.stop.forEach(stop => {
        stopTags[stop._tag] = stop;
      });

      route.direction.forEach(direction => {
        for (let i = 0; i < direction.stop.length; i++) { // eslint-disable-line no-plusplus
          const tag = direction.stop[i]._tag;
          direction.stop[i] = stopTags[tag];
        }
      });
    });
    return routeData;
  }
}
