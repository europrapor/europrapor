/* global OpenLayers */

'use strict';

angular.module('ngEuroPraporApp')
  .controller('LayersMapCtrl', function ($scope, LayersMap) {
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 2;
    OpenLayers.Util.onImageLoadErrorColor = 'transparent';

    // number of layers in the view
    $scope.numOfReadyLayers = 0;

    // layers colors config
    var layersColors = {
      anger: {
        fillColor: '#ff6d3d',
        strokeColor: '#ff0000'
      },
      joy: {
        fillColor: '#fff600',
        strokeColor: '#b85f00'
      },
      fear: {
        fillColor: '#00d8ff',
        strokeColor: '#006bb8'
      },
      determination: {
        fillColor: '#19ff00',
        strokeColor: '#00c210'
      }
    };

    // fetch emotions maps data
    LayersMap.get(['anger', 'joy', 'fear', 'determination'],
      function (layersData) {
      var cacheRead1, cacheRead2, cacheWrite,
          touchNavigation, zoom,
          emotionMap, OSMLayer,
          layers = {};

      // store layers
      $scope.layers = {};

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
        touchNavigation, zoom]);

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

        $scope.layers[layerName] = layer;

        $scope.numOfReadyLayers++;
      }

      // init cache controllers
      cacheRead1.activate();
      cacheRead2.activate();
      cacheWrite.activate();
    });
  })
  .directive('ngLayersSwitcher', function() {
    return {
      restrict: 'AE',
      replace: true,
      template: '<div class="layers-switcher" ng-class="{show: isSwitcherActive}">'+
        '<div class="switcher-inner">'+
        '<div class="switch" ng-click="toggleSwitcher()">'+
        '<div class="switch-inner">'+
        '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="22"><path d="M13 4l-8 4 8 4 8-4-8-4zm-6 6l-2 1 8 4 8-4-2-1-6 3-6-3zm0 3l-2 1 8 4 8-4-2-1-6 3-6-3z" fill="#fff"/></svg>'+
        '</div>'+
        '</div>'+
        '<ul ng-repeat="name in layersNames">'+
        '<li class="layer">'+
        '<span ng-click="toggleLayer(name)" ng-class="{inactive: !layers[name].visibility}">'+
        '{{name}}'+
        '</span>'+
        '</li>'+
        '</ul>'+
        '</div>'+
        '</div>',
      link: function ($scope, $element, $attrs) {
        $scope.$watch('numOfReadyLayers', function() {
          if ($scope.layers) {
            $scope.layersNames = _.keys($scope.layers);

            if ($scope.numOfReadyLayers === $scope.layersNames.length) {

            }
          }
        });

        $scope.isSwitcherActive = false;
        $scope.toggleSwitcher = function() {
          $scope.isSwitcherActive = !$scope.isSwitcherActive;
        };
        $scope.toggleLayer = function (name) {
          var targetLayer = $scope.layers[name];

          targetLayer.setVisibility(!targetLayer.visibility);
        };
      }
    };
  });
