'use strict';

angular.module('tenantappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tenants', {
        url: '/tenants',
        templateUrl: 'app/tenants/tenants.html',
        controller: 'TenantsCtrl'
      });
  });
