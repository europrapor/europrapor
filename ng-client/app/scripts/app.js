'use strict';

angular.module('ngEuroPraporApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/checkin.html',
        controller: 'CheckinCtrl'
      })
      .when('/density-map', {
        templateUrl: 'views/density-map.html',
        controller: 'DensityMapCtrl'
      })
      .when('/layers-map', {
        templateUrl: 'views/layers-map.html',
        controller: 'LayersMapCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
