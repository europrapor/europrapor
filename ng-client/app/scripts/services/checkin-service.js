'use strict';

angular.module('ngEuroPraporApp')
  .factory('Checkin', function ($resource) {
    return $resource('http://api.europrapor.oxogamestudio.com/check-in');
  });
