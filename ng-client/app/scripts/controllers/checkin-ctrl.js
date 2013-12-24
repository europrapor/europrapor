'use strict';

angular.module('ngEuroPraporApp')
  .controller('CheckinCtrl', function ($scope, $timeout) {
    
    $scope.sliders = {
        anger:   0
      , joy:     2
      , determ:  7
      , fear:    5
    };

    $scope.my_func = function() {
      console.log("here");
    };
    
    $scope.$watch('sliders', function(newValue, oldValue) {
      console.log("watcher fired: ", newValue, oldValue);
    });

    $timeout(function() {
      $scope.sliders = {
          anger:   1
        , joy:     2
        , determ:  7
        , fear:    5
      };
    }, 2000 );

  });
