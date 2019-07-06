/**
 * @ngdoc function
 * @name sfDashApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the sfDashApp
 */
angular.module('sfDashApp')
  .controller('SettingsCtrl', function ($scope, $localStorage, weatherSvc) {
    $scope.$storage = $localStorage;

    $scope.storeKey = function (key) {
      $scope.$storage.weather = key;
    };
    $scope.validateKey = function (key) {
      weatherSvc.validateKey(key)
        .then(function () {
          $scope.validKey = true;
          weatherSvc.storeKey(key);
        }, function () {
          $scope.validKey = false;
        });
    };
    $scope.dumpLocalStorage = function () {
      $scope.$storage.$reset();
      $scope.weatherKey = '';
      $scope.validKey = undefined;
    };
  });
