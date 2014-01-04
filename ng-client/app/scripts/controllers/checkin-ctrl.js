/* global SliderControl */

'use strict';

angular.module('ngEuroPraporApp')
  .controller('CheckinCtrl', function ($scope, $timeout, Checkin) {

    $scope.sliders = {
        anger:          5
      , joy:            5
      , determination:  5
      , fear:           5
      , privacy:        10
    };

    $scope.performCheckin = function() {
      $scope.loaderIcon = 'spinner';
      $scope.loading = true;

      navigator.geolocation.getCurrentPosition(function (position) {
        var checkin;

        $scope.position = {
          lt: position.coords.latitude,
          lg: position.coords.longitude
        };

        checkin = new Checkin({
          position: $scope.position,
          mental_state: _.omit($scope.sliders, 'privacy'),
          privacy: $scope.sliders.privacy
        });

        checkin.$save()
          .then(function (res) {
            // SUCCESS
            $scope.loaderIcon = 'success';
          },
          function (err) {
            // NETWORK_ERROR
            $scope.loaderIcon = 'error';
          })
          .finally(function() {
            $timeout(function() {
              $scope.loading = false;
            }, 1000);
          });
      },
      function (err) {
        switch (err.code) {
          case 1:
            // PERMISSION_DENIED
            $scope.$apply(function() {
              $scope.loaderIcon = 'denied';
            });
            break;
          case 2:
            // POSITION_UNAVAILABLE
            $scope.$apply(function() {
              $scope.loaderIcon = 'unavailable';
            });
            break;
          case 3:
            // TIMEOUT
            $scope.$apply(function() {
              $scope.loaderIcon = 'timeout';
            });
            break;
        }

        $scope.$apply(function() {
          $timeout(function() {
            $scope.loading = false;
          }, 1000);
        });
      });
    };

  })
  .directive('ngSlider', function() {
    var rangeSlider = function ($scope, $element, $attrs) {
      new SliderControl($element[0], 0, 10, {
        label: $attrs.id.toUpperCase(),
        initialValue: $scope.sliders[$attrs.id],
        onslide: function() {
          $scope.sliders[$attrs.id] = this.getValue();
        }
      });
    };

    return rangeSlider;
  })
  .directive('ngLoader', function() {
    return {
      restrict: 'AE',
      replace: true,
      template: '<div class="overlay">'+
        '<i class="glyphicon glyphicon-refresh"></i>'+
        '<i class="glyphicon glyphicon-minus-sign"></i>'+
        '<i class="glyphicon glyphicon-globe"></i>'+
        '<i class="glyphicon glyphicon-time"></i>'+
        '<i class="glyphicon glyphicon-ok-circle"></i>'+
        '<i class="glyphicon glyphicon-warning-sign"></i>'+
        '</div>',
      link: function ($scope, $element, $attrs) {
        $scope.$watch('loading', function ($val) {
          if ($val)
            $element.fadeIn(200);
          else
            $element.fadeOut(200);
        });
      }
    };
  });
