'use strict';

angular.module('ngEuroPraporApp')
  .factory('LayersMap', function ($resource) {
    return function getLayerData (map) {
      return $resource('http://devel.api.europrapor.oxogamestudio.com/map');
    };
  });
