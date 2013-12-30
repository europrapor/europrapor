'use strict';

angular.module('ngEuroPraporApp')
  .factory('DensityMap', function ($resource) {
    return $resource('http://devel.api.europrapor.oxogamestudio.com/map');
  });
