'use strict';

angular.module('ngEuroPraporApp')
  .factory('Checkin', function ($resource) {
    return $resource('http://api.maidanpower.org/check-in');
  });
