'use strict';

describe('Service: plots', function () {

  // load the service's module
  beforeEach(module('tenantappApp'));

  // instantiate service
  var plots;
  beforeEach(inject(function (_plots_) {
    plots = _plots_;
  }));

  it('should do something', function () {
    expect(!!plots).toBe(true);
  });

});
