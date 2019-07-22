import angular from 'angular';


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
