/* global SliderControl */

'use strict';

angular.module('ngEuroPraporApp')
  .controller('CheckinCtrl', function ($scope, $timeout, $cookies, Checkin) {
    var checkinToken = $cookies.api_key,
	params = {};

    if (checkinToken) {
      params.api_key = checkinToken;
    }

    $scope.sliders = {
      anger: {
        value: 5,
        name: 'SLIDER_ANGER'
      },
      joy: {
        value: 5,
        name: 'SLIDER_JOY'
      },
      determination: {
        value: 5,
        name: 'SLIDER_DETERM'
      },
      fear: {
        value: 5,
        name: 'SLIDER_FEAR'
      },
      privacy: {
        value: 10,
        name: 'SLIDER_PRIVACY'
      }
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
          mental_state: (function() {
            var emos = _.omit($scope.sliders, 'privacy'),
                data = {};

            for (var emo in emos) {
              data[emo] = emos[emo].value;
            }

            return data;
          })(),
          privacy: $scope.sliders.privacy.value
        });

	checkin.$save(params)
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
      var range = [0, 10];

      if ($attrs.id == 'privacy') {
	range = [10, 0];
      }

      new SliderControl($element[0], range[0], range[1], {
        label: $attrs.label.toUpperCase(),
        initialValue: $scope.sliders[$attrs.id].value,
        onslide: function() {
          $scope.sliders[$attrs.id].value = this.getValue();
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
