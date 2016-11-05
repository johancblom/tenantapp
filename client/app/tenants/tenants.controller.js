'use strict';

angular.module('tenantappApp')
  .controller('TenantsCtrl', function ($scope, $filter, Tenant, Plot) {
    $scope.tenants = Tenant.query();

    $scope.data = { plotChanged: {}, plotRemoved: {},
      availablePlots: $filter('inUsePlots')(Plot.query())};

    $scope.deleteTenant = function (tenant) {
      Tenant.delete().then(function () {
        $scope.tenants.splice($scope.tenants.indexOf(tenant), 1);
      });
    }

    $scope.updateTenant = function (tenant) {
      $scope.tenants[$scope.tenants.map(function(t) { return t._id}).indexOf(tenant._id)] = tenant;
      $scope.editedTenant = null;
    }

    $scope.createTenant = function (tenant) {
      tenant.plots=[];
      $scope.tenants.push(tenant);
      $scope.editedTenant = null;
    }

    $scope.startEdit = function (tenant) {
      $scope.editedTenant = angular.copy(tenant);
      $scope.availablePlots = Plot.findByNumber(tenant.plots);
      console.log("available Plots: " + $scope.availablePlots);
    }

    $scope.startEditPlots = function(tenant) {
      $scope.data.availablePlots = $filter('inUsePlots')(Plot.query());
      console.log("availablePlots: " + $scope.data.availablePlots.length);
      $scope.plotTenant = tenant;
      $scope.editedPlots = angular.copy(tenant.plots);
      $scope.data.plotsChanged = $scope.editedPlots;
    }

    $scope.cancelEdit = function () {
      $scope.editedTenant = null;
    }


    $scope.savePlot = function(tenant, index) {
      $scope.editedPlots = $scope.data.plotsChanged;
      $scope.data.availablePlots.splice(index, 1);
      $scope.plotTenant.plots = angular.copy($scope.editedPlots);
    }

    $scope.removePlotFromTenant=function(tenant, plot) {
      console.log($scope.editedPlots.map(function(e) { return e.number}).indexOf(plot.number));
      $scope.editedPlots.splice($scope.editedPlots.map(function(e) { return e.number}).indexOf(plot.number), 1);
      $scope.plotTenant.plots=angular.copy($scope.editedPlots);
      $scope.data.plotRemoved = {};
    }

    $scope.addPlotToTenant=function(tenant, plot) {
      $scope.editedPlots.push(plot);
      $scope.plotTenant.plots=angular.copy($scope.editedPlots);
    }
  });
