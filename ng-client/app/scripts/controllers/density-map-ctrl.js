/* global OpenLayers */

'use strict';

angular.module('ngEuroPraporApp')
  .controller('DensityMapCtrl', function ($scope, $timeout, DensityMap) {
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 2;
    OpenLayers.Util.onImageLoadErrorColor = 'transparent';

    // fetch geodata
    DensityMap.get(function (densityData) {
      var cacheRead1, cacheRead2, cacheWrite,
          touchNavigation, zoom,
          densityMap, OSMLayer, densityLayer;

      // create a map
      densityMap = new OpenLayers.Map('density-map', {
        theme: null
      });

      // create OSM layer
      OSMLayer = new OpenLayers.Layer.OSM('Open Street Map', null, {
        transitionEffect: 'resize',
        numZoomLevels: null,
        minZoomLevel: 2,
        maxZoomLevel: 15
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
      densityLayer.setDataSet(densityData);

      // set initial map center
      densityMap.setCenter(new OpenLayers.LonLat(-78271.516953204, 5518141.9451953));

      // init cache controllers
      cacheRead1.activate();
      cacheRead2.activate();
      cacheWrite.activate();
    });
  });
