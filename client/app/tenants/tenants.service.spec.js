'use strict';

describe('Service: tenants', function () {

  // load the service's module
  beforeEach(module('tenantappApp'));

  // instantiate service
  var tenants;
  beforeEach(inject(function (_Tenant_) {
    tenants = _Tenant_;
  }));

  it('should do something', function () {
    expect(!!tenants).toBe(true);
  });

});
