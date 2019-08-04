import angular from 'angular';


export const cToF = celsius => ((celsius * 9) / 5) + 32;

export const fToC = fahrenheit => ((fahrenheit - 32) * 5) / 9;

angular.module('sfDashApp')
  .filter('cToF', () => input => {
    if (!input) { return ''; }
    return `${cToF(input)}`;
  });

angular.module('sfDashApp')
  .filter('fToC', () => input => {
    if (!input) { return ''; }
    return `${fToC(input)}`;
  });
