'use strict';

angular.module('tenantappApp')
  .factory('Tenant', function () {
    var last_id = 2;
    var example_tenants =
      [
        {_id: 1, title: 'Mr', initials: 'J.C.', surname: 'Dean', street: '6 Meadow Road', town: 'London', plots: [{_id: 1, number: '7a', size: 2.5, in_use: true},{_id: 2, number: '7b', size: 5, in_use: true},{_id: 3, number: '72a', size: 4, in_use: true}], concess: 'N'},
        {_id: 2, title: 'Mr', initials: 'H.L.', surname: 'Baker', street: '6 Fleet Street', town: 'London', plots: [{_id: 4, number: '72b', size: 2.5, in_use: true}], concess: 'N'}
      ];
    return {
      query: function () {
        return example_tenants;
      },

      get: function(params) {
        var result = {};
        angular.forEach(example_tenants, function (tenant) {
          if (tenant._id == params._id)
            return this.tenant = tenant;
        }, result);
        return result.tenant;
      },

      delete: function(params) {
        angular.forEach(example_tenants, function(tenant, index) {
          if (tenant._id == params._id) {
            console.log(tenant, index);
            example_tenants.splice(index, 1);
            return;
          }
        })
      },

      update: function(tenant) {
        var item = this.get(tenant);
        if (!item) return false;

        item.title = tenant.title;
        item.initials = tenant.initials;
        item.surname = tenant.surname;

        return true;
      },

      create: function(tenant) {
        tenant._id = ++last_id;
        example_tenants.push(tenant);
      }
    }
  }
  );

