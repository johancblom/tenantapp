'use strict';

angular.module('tenantappApp')
  .factory('Tenant', function () {
    var example_tenants =
      [
        {_id: 1, title: 'Mr', initials: 'J.C.', surname: 'Blom', street: '6 Meadowview Road', town: 'London', plots: [{_id: 1, number: '7a', size: 2.5, in_use: true},{_id: 2, number: '7b', size: 5, in_use: true}], concess: 'N'},
        {_id: 2, title: 'Mr', initials: 'J.C.', surname: 'Blom', street: '6 Meadowview Road', town: 'London', plots: [{_id: 3, number: '72a', size: 4, in_use: true},{_id: 4, number: '72b', size: 2.5, in_use: true}], concess: 'N'}
      ];
    return {
      query: function () {
        return example_tenants;
      },
      delete: function(tenant) {
        example_tenants.splice(example_tenants.indexOf(tenant),1);
      }
    }
  }
  );

