/* global OpenLayers */

'use strict';

angular.module('ngEuroPraporApp')
  .factory('DensityMap', function ($resource, $timeout) {
    var densityData = null,
        dataSource = $resource('http://devel.api.europrapor.oxogamestudio.com/map');

    return {
      get: function (callback) {
        if (densityData === null) {
          dataSource.query(function (data) {
            var dataLength = data.length,
                OLReadyData = {
                  max: 1,
                  data: []
                };

            // convert geodata to Open Layers ready data
            while (dataLength--) {
              OLReadyData.data.push({
                  lonlat: new OpenLayers.LonLat(
                    data[dataLength].position.lg,
                    data[dataLength].position.lt
                  ),
                  count: 1
              });
            }

            densityData = OLReadyData;

            callback(densityData);
          });
        } else {
          /* map renders faster than Angular's view
           * when data is stored on client.
           * Need to investigate more on this.
           */
          $timeout(function() {
            callback(densityData);
          }, 500);
        }
      }
    };
  });
