'use strict';

describe('Controller: TenantsCtrl', function () {

  // load the controller's module
  beforeEach(module('tenantappApp'));

  var TenantsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TenantsCtrl = $controller('TenantsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
