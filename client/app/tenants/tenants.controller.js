'use strict';

angular.module('tenantappApp')
  .controller('TenantsCtrl', function ($scope, $filter, Tenant, Plot) {
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
  }])
  .controller('ModalDemoCtrl', function ($modal, $log, $document) {
    var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];

    $ctrl.animationsEnabled = true;

    $ctrl.open = function (size, parentSelector) {
      var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $modal.open({
        animation: $ctrl.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: '$ctrl',
        size: size,
        appendTo: parentElem,
        resolve: {
          items: function () {
            return $ctrl.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $ctrl.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  })
  .controller('ModalInstanceCtrl', function ($modalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
      item: $ctrl.items[0]
    };

    $ctrl.ok = function () {
      $modalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

