angular.module('ngEuroPraporApp')
  .directive('ngResizable', function ($window) {
    return function ($scope) {
      $scope.initializeWindowSize = function() {
        $scope.windowHeight = $window.innerHeight;
        $scope.windowWidth = $window.innerWidth;
      };

      $scope.initializeWindowSize();

      angular.element($window).bind('resize', function() {
        $scope.initializeWindowSize();
        $scope.$apply();
      });
    };
  });
