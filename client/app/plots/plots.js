'use strict';

angular.module('tenantappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plots', {
        url: '/plots',
        templateUrl: 'app/plots/plots.html',
        controller: 'PlotsCtrl'
      });
  });
