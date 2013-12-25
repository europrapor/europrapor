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
            $scope.loading = false;
          },
          function (err) {
            console.log(err);
          });
      });
    };

  })
  .directive('ngSlider', function() {
    var rangeSlider = function ($scope, $element, $attrs) {
      new SliderControl($element[0], 0, 10, {
        label: $attrs.id.toUpperCase()
      , initialValue: $scope.sliders[$attrs.id]
      , onslide: function() {
          $scope.sliders[$attrs.id] = this.getValue();
        }
      });
    };

    return rangeSlider;
  })
  .directive('ngLoader', function() {
    return {
      restrict: 'AE'
    , replace: true
    , template: '<div class="overlay glyphicon glyphicon-refresh"></div>'
    , link: function ($scope, $element, $attrs) {
      $scope.$watch('loading', function ($val) {
        if ($val)
          $element.fadeIn(200);
        else
          $element.fadeOut(200);
      });
    }
    };
  });
