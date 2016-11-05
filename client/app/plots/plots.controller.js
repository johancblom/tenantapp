'use strict';

angular.module('tenantappApp')
  .controller('PlotsCtrl', function ($scope, Plot) {
    $scope.plots = Plot.query();
  });
