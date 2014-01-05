'use strict';

angular.module('ngEuroPraporApp')
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.availableTitles = {
      '/': 'TITLE_CHECK-IN',
      '/density-map': 'TITLE_DENSITY-MAP',
      '/layers-map': 'TITLE_EMO_MAP'
    };
    $scope.location = $location;
    $scope.nav = {
      prev: {enabled: false, url: ''},
      next: {enabled: false, url: ''}
    };

    $scope.$watch('location.path()', function (path) {
      $scope.title = $scope.availableTitles[path];
      setNav(path);
    });

    function setNav (path) {
      var URLs = _.keys($scope.availableTitles),
          prev, current, next;

      current = _.indexOf(URLs, path);
      prev = URLs[current - 1];
      next = URLs[current + 1];

      $scope.nav.prev = {
        enabled: !prev,
        url: '#' + prev || ''
      };
      $scope.nav.next = {
        enabled: !next,
        url: '#' + next || ''
      };
    }
  });
