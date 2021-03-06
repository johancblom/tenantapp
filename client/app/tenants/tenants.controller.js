'use strict';

angular.module('tenantappApp')
  .controller('TenantsCtrl', function ($scope, $filter, Tenant, Plot, Modal) {
    $scope.tenants = Tenant.query();

    $scope.plotChanged =  {};
    $scope.plotRemoved = {},
      $scope.availablePlots = $filter('inUsePlots')(Plot.query());

    $scope.deleteTenant = function (tenant) {
      Tenant.delete(tenant);
    }

    $scope.updateTenant = function (tenant) {
      Tenant.update(tenant);
      $scope.editedTenant = null;
    }

    function getFields(input, field) {
      var output = [];
      for (var i=0; i < input.length; ++i) {
        output.push(input[i][field]);
      }
      console.log(input.length);
      console.log(output.length);
      return output;
    }

    $scope.details = function(tenant) {
      Modal.details(tenant, '<p>Here are the details for tenant <strong>' + tenant.surname + '</strong>:</p>' +
        '<p>' + 'Title: ' + tenant.title + '</p>' +
        '<p>' + 'Initials: ' + tenant.initials + '</p>' +
        '<p>' + 'Surname: ' + tenant.surname + '</p>' +
        '<p>' + 'Street: ' + tenant.street + '</p>' +
        '<p>' + 'Town: ' + tenant.town + '</p>' +
        '<p>' + 'Plots: ' + getFields(tenant.plots, 'number').reduce(function(a,b) { return (a + " " + b)}, " ") + '</p>' +
        '<p>' + 'Concessionary: ' + tenant.concess + '</p>');
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
      $scope.availablePlots = $filter('inUsePlots')(Plot.query());
      console.log("availablePlots: " + $scope.availablePlots.length);
      $scope.plotTenant = tenant;
      $scope.editedPlots = angular.copy(tenant.plots);
      $scope.plotsChanged = $scope.editedPlots;
    }

    $scope.cancelEdit = function () {
      $scope.editedTenant = null;
    }


    $scope.savePlot = function(tenant, index) {
      $scope.editedPlots = $scope.plotsChanged;
      $scope.availablePlots.splice(index, 1);
      $scope.plotTenant.plots = angular.copy($scope.editedPlots);
    }

    $scope.updatePlots = function(tenant) {
      $scope.plotTenant.plots = angular.copy($scope.editedPlots);
      $scope.editedPlots.map(function(plot) {
        plot.in_use = true;
        Plot.update(plot);
      });
      $scope.availablePlots.map(function(plot) {
        plot.in_use = false;
        Plot.update(plot);
      });
      $scope.editedPlots = null;
    };

    $scope.cancelEditPlots = function() {
      $scope.editedTenant = null;
      $scope.editedPlots = null;
    };


    $scope.removePlotFromTenant=function(tenant, plot) {
      console.log($scope.editedPlots.map(function(e) { return e.number}).indexOf(plot.number));
      $scope.editedPlots.splice($scope.editedPlots.map(function(e) { return e.number}).indexOf(plot.number), 1);
      $scope.plotTenant.plots=angular.copy($scope.editedPlots);
      $scope.plotRemoved = {};
    };

    $scope.addPlotToTenant=function(tenant, plot) {
      $scope.editedPlots.push(plot);
      $scope.plotTenant.plots=angular.copy($scope.editedPlots);
    }

  })
  .constant('ngSortableConfig', {onEnd: function() {
    console.log('default onEnd()');
  }})
  .controller('TodoController', ['$scope', function ($scope) {
    $scope.todos = [
      {text: 'learn angular', done: true},
      {text: 'build an angular app', done: false}
    ];

    $scope.addTodo = function () {
      $scope.todos.push({text: $scope.todoText, done: false});
      $scope.todoText = '';
    };

    $scope.remaining = function () {
      var count = 0;
      angular.forEach($scope.todos, function (todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.archive = function () {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };
  }])
  .controller('TodoControllerNext', ['$scope', function ($scope) {
    $scope.todos = [
      {text: 'learn Sortable', done: true},
      {text: 'use ng-sortable', done: false},
      {text: 'Enjoy', done: false}
    ];

    $scope.remaining = function () {
      var count = 0;
      angular.forEach($scope.todos, function (todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.sortableConfig = { group: 'todo', animation: 150 };
    'Start End Add Update Remove Sort'.split(' ').forEach(function (name) {
      $scope.sortableConfig['on' + name] = console.log.bind(console, name);
    });
  }]);

