/* global OpenLayers */

'use strict';

angular.module('ngEuroPraporApp')
  .controller('DensityMapCtrl', function ($scope, $timeout, DensityMap) {
    var densityData = DensityMap.query(function() {
      var OLReadyData = {
            max: 1,
            data: []
          },
          dataLength = densityData.length,
          densityMap, OSMLayer, densityLayer;

      while (dataLength--) {
        OLReadyData.data.push({
            lonlat: new OpenLayers.LonLat(
              densityData[dataLength].position.lg,
              densityData[dataLength].position.lt
            ),
            count: 1
        });
      }

      densityMap = new OpenLayers.Map('density-map');
      OSMLayer = new OpenLayers.Layer.OSM();

      densityLayer = new OpenLayers.Layer.Heatmap('DensityLayer', densityMap, OSMLayer,
        {
          visible: true,
          radius: 10
        },
        {
          isBaseLayer: false,
          opacity: 0.3,
          projection: new OpenLayers.Projection('EPSG:4326')
        }
      );

      densityMap.addLayers([OSMLayer, densityLayer]);
      densityMap.zoomToMaxExtent();

      densityLayer.setDataSet(OLReadyData);
    });
  });
