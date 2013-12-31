/* global OpenLayers */

'use strict';

angular.module('ngEuroPraporApp')
  .controller('LayersMapCtrl', function ($scope, LayersMap) {
    // layers colors config
    var layersColors = {
      anger: {
        0.45: 'rgb(255, 0, 0)',
        0.8: 'rgb(255, 0, 0)'
      },
      joy: {
        0.45: 'rgb(0, 255, 0)',
        0.8: 'rgb(0, 255, 0)'
      },
      fear: {
        0.9: 'rgb(0, 0, 255)',
        1.0: 'rgb(0, 0, 255)'
      },
      determination: {
        0.45: 'rgb(255, 255, 0)',
        0.8: 'rgb(255, 255, 0)'
      }
    };

    // fetch emotions maps data
    LayersMap.get(['anger', 'joy', 'fear', 'determination'],
      function (layersData) {
      var cacheRead1, cacheRead2, cacheWrite,
          touchNavigation, zoom,
          emotionMap, OSMLayer,
          layers = {};

      // create a map
      emotionMap = new OpenLayers.Map('layers-map', {
        theme: null
      });

      // create OSM layer
      OSMLayer = new OpenLayers.Layer.OSM('Open Street Map', null, {
        transitionEffect: 'resize',
        numZoomLevels: null,
        minZoomLevel: 2,
        maxZoomLevel: 15
      });

      for (var layer in layersData) {
        var layerData = layersData[layer];

        layers[layer] = createLayer(layer, emotionMap, OSMLayer, layersColors[layer]);
      }

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

      // add OSM layer to map
      emotionMap.addLayers([OSMLayer]);

      // set initial zoom level
      emotionMap.zoomToMaxExtent();

      // add cache controllers & other controls
      emotionMap.addControls([cacheRead1, cacheRead2, cacheWrite,
        touchNavigation, zoom]);

      for (var layer in layersData) {
        var layerData = layersData[layer];

        emotionMap.addLayers([layers[layer]]);

        // put Open Layers ready data to the map
        layers[layer].setDataSet(layerData);
      }

      // init cache controllers
      cacheRead1.activate();
      cacheRead2.activate();
      cacheWrite.activate();
    });

    function createLayer (name, map, baseLayer, color) {
      var emotionLayer;

      // create density map layer
      emotionLayer = new OpenLayers.Layer.Heatmap(name + 'Layer', map, baseLayer,
        {
          visible: true,
          radius: 10,
          gradient: color,
          opacity: 50
        },
        {
          isBaseLayer: false,
          projection: new OpenLayers.Projection('EPSG:4326')
        }
      );

      return emotionLayer;
    }
  });
