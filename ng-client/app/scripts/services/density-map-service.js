/* global OpenLayers */

'use strict';

angular.module('ngEuroPraporApp')
  .factory('DensityMap', function ($resource, $timeout) {
    var densityData = null,
        OLReadyData = null,
        dataSource = $resource('http://devel.api.europrapor.oxogamestudio.com/map'),
        getData, convertData;

    // get raw data from server
    getData = function (middleware, callback) {
      dataSource.query(function (data) {
        densityData = data;

        middleware(callback);
      });
    };

    // convert geo data to OpenLayers ready data
    convertData = function (callback) {
      var dataLength = densityData.length;

      OLReadyData = {
        max: 1,
        data: []
      };

      // convert geodata to Open Layers ready data
      while (dataLength--) {
        OLReadyData.data.push({
            lonlat: new OpenLayers.LonLat(
              densityData[dataLength].position.lg,
              densityData[dataLength].position.lt
            ),
            count: 1
        });
      }

      callback();
    };

    return {
      // returns OpenLayers ready data
      get: function (callback) {
        if (OLReadyData === null) {
          getData(convertData, function() {
            callback(OLReadyData);
          });
        } else {
          /* map renders faster than Angular's view
           * when data is stored on client.
           * Need to investigate more on this.
           */
          $timeout(function() {
            callback(OLReadyData);
          }, 500);
        }
      },
      // returns raw geo data
      getRaw: function (callback) {
        if (densityData === null) {
          getData(convertData, function() {
            callback(densityData);
          });
        } else {
          callback(densityData);
        }
      }
    };
  });
