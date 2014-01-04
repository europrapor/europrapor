/* global OpenLayers */

'use strict';

angular.module('ngEuroPraporApp')
  .controller('LayersMapCtrl', function ($scope, LayersMap) {
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 2;
    OpenLayers.Util.onImageLoadErrorColor = 'transparent';

    // layers colors config
    var layersColors = {
      anger: {
        fillColor: '#ff6d3d',
        strokeColor: '#ff0000'
      },
      joy: {
        fillColor: '#fff600',
        strokeColor: '#e2dd36'
      },
      fear: {
        fillColor: '#00d8ff',
        strokeColor: '#23b7d1'
      },
      determination: {
        fillColor: '#19ff00',
        strokeColor: '#2fd81c'
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

      // set initial map center
      emotionMap.setCenter(new OpenLayers.LonLat(-78271.516953204, 5518141.9451953));

      // add cache controllers & other controls
      emotionMap.addControls([cacheRead1, cacheRead2, cacheWrite,
        touchNavigation, zoom, new OpenLayers.Control.LayerSwitcher()]);

      for (var layerName in layersData) {
        var layerData = layersData[layerName].data,
            layer = new OpenLayers.Layer.Vector(layerName + ' Layer');

        // put Open Layers ready data to the map
        for (var i = 0; i < layerData.length; i++) {
          var checkin = layerData[i];

          checkin.lonlat.transform(
            new OpenLayers.Projection('EPSG:4326'),
            emotionMap.getProjectionObject()
          );

          var pointGeometry = new OpenLayers.Geometry.Point(
                checkin.lonlat.lon, checkin.lonlat.lat
              ),
              point = new OpenLayers.Feature.Vector(pointGeometry);

          point.style = {
            fillColor: layersColors[layerName].fillColor,
            strokeColor: layersColors[layerName].strokeColor,
            fillOpacity: 0.2,
            strokeOpacity: 0.6,
            pointRadius: checkin.count + 2
          };

          layer.addFeatures([point]);
        }

        emotionMap.addLayers([layer]);
      }

      // init cache controllers
      cacheRead1.activate();
      cacheRead2.activate();
      cacheWrite.activate();
    });
  });
