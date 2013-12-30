/* global OpenLayers */

'use strict';

angular.module('ngEuroPraporApp')
  .controller('DensityMapCtrl', function ($scope, $timeout, DensityMap) {
    // fetch geodata
    var densityData = DensityMap.query(function() {
      var cacheRead1, cacheRead2, cacheWrite,
          touchNavigation, zoom;

      var OLReadyData = {
            max: 1,
            data: []
          },
          dataLength = densityData.length,
          densityMap, OSMLayer, densityLayer;

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

      // create a map
      densityMap = new OpenLayers.Map('density-map', {
        theme: null
      });

      // create OSM layer
      OSMLayer = new OpenLayers.Layer.OSM('Open Street Map', null, {
        transitionEffect: 'resize'
      });

      // create density map layer
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

      // try cache before loading from remote resource
      cacheRead1 = new OpenLayers.Control.CacheRead({
        eventListeners: {
          activate: function() {
            cacheRead2.deactivate();
          }
        }
      });

      // try loading from remote resource and fall back to cache
      cacheRead2 = new OpenLayers.Control.CacheRead({
        autoActivate: false,
        fetchEvent: 'tileerror',
        eventListeners: {
          activate: function() {
            cacheRead1.deactivate();
          }
        }
      });

      // cache map tiles to localStorage
      cacheWrite = new OpenLayers.Control.CacheWrite({
        imageFormat: 'image/jpeg',
        eventListeners: {
          cachefull: function() {}
        }
      });

      // enable touch optimized navigation
      touchNavigation = new OpenLayers.Control.TouchNavigation({
        dragPanOptions: {
          enableKinetic: true
        }
      });

      zoom = new OpenLayers.Control.Zoom();

      // add layers to map
      densityMap.addLayers([OSMLayer, densityLayer]);

      // set initial zoom level
      densityMap.zoomToMaxExtent();

      // add cache controllers & other controls
      densityMap.addControls([cacheRead1, cacheRead2, cacheWrite,
        touchNavigation, zoom]);

      // put Open Layers ready data to the map
      densityLayer.setDataSet(OLReadyData);

      // init cache controllers
      cacheRead1.activate();
      cacheRead2.activate();
      cacheWrite.activate();
    });
  });
