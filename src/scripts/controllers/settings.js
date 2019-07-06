import angular from 'angular';

/**
 * @ngdoc function
 * @name sfDashApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('SettingsCtrl', ($scope, $localStorage, weatherSvc) => {
    $scope.$storage = $localStorage;

    $scope.storeKey = key => {
      $scope.$storage.weather = key;
    };
    $scope.validateKey = key => {
      weatherSvc.validateKey(key)
        .then(() => {
          $scope.validKey = true;
          weatherSvc.storeKey(key);
        }, () => {
          $scope.validKey = false;
        });
    };
    $scope.dumpLocalStorage = () => {
      $scope.$storage.$reset();
      $scope.weatherKey = '';
      $scope.validKey = undefined;
    };
  });
