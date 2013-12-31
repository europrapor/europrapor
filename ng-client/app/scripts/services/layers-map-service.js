/* global OpenLayers */

'use strict';

angular.module('ngEuroPraporApp')
  .factory('LayersMap', function ($resource, $timeout, DensityMap) {
    var layersData = {},
        RESOURCE_URL = 'http://devel.api.europrapor.oxogamestudio.com/map/',
        getData, convertData;

    // get and map emotion map data to density data
    getData = function (maps, callback) {
      var count = 0;

      var process = function get() {
        var map = maps[count];

        var url = RESOURCE_URL + map,
            dataSource = $resource(url);

        layersData[map] = [];
        dataSource.query(function (data) {
          DensityMap.getRaw(function (densityData) {
            for (var j = 0; j < data.length; j++) {
              for (var k = 0; k < densityData.length; k++) {
                if (data[j].id === densityData[k].id) {
                  var mergedPoint = densityData[k];

                  mergedPoint.heat = data[j].heat;

                  layersData[map].push(mergedPoint);
                }
              }
            }

            count++;

            if (count === maps.length) {
              convertData(callback);
            } else {
              get();
            }
          });
        });
      };

      process();
    };

    // convert geo data to OpenLayers ready data
    convertData = function (callback) {
      for (var data in layersData) {
        var layerData = layersData[data],
            dataLength = layerData.length,
            OLReadyData;

        OLReadyData = {
          max: 10,
          data: []
        };

        // convert geodata to Open Layers ready data
        while (dataLength--) {
          OLReadyData.data.push({
              lonlat: new OpenLayers.LonLat(
                layerData[dataLength].position.lg,
                layerData[dataLength].position.lt
              ),
              count: layerData[dataLength].heat
          });
        }

        layersData[data] = OLReadyData;
      }

      callback(layersData);
    };

    return {
      // returns emotion map data
      get: function (map, callback) {
        if (!layersData[map]) {
          getData(map, callback);
        } else {
          /* map renders faster than Angular's view
           * when data is stored on client.
           * Need to investigate more on this.
           */
          $timeout(function() {
            callback(layersData);
          }, 500);
        }
      }
    };
  });
