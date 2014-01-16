'use strict';

angular.module('ngEuroPraporApp')
  .factory('Checkin', function ($resource) {
    return $resource('http://devel.api.maidanpower.org/check-in');
  });
