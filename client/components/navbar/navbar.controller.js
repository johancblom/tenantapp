'use strict';

angular.module('tenantappApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    },
    {
      'title': 'Tenants',
      'state': 'tenants'
    },
    {
      'title': 'Plots',
      'state': 'plots'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
