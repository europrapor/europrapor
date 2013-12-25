/* global SliderControl */

'use strict';

angular.module('ngEuroPraporApp')
  .controller('CheckinCtrl', function ($scope, $timeout) {

    $scope.sliders = {
        anger:          0
      , joy:            2
      , determination:  7
      , fear:           5
    };

  })
  .directive('ngSlider', function() {
    var rangeSlider = function ($scope, $element, $attrs) {
      new SliderControl($element[0], 0, 10, {
        label: $attrs.id.toUpperCase()
      });
    };

    return rangeSlider;
  });
