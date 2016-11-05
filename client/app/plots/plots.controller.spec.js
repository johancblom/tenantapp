'use strict';

describe('Controller: PlotsCtrl', function () {

  // load the controller's module
  beforeEach(module('tenantappApp'));

  var PlotsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlotsCtrl = $controller('PlotsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
