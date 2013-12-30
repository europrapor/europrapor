'use strict';

angular.module('ngEuroPraporApp')
  .factory('DensityMap', function ($resource) {
    return $resource('http://api.europrapor.oxogamestudio.com/map');
  });
