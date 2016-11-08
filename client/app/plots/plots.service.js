'use strict';

angular.module('tenantappApp')
  .factory('Plot', function($filter) {
      var last_id = 6;
      var example_plots =
        [
          {_id: 1, number: '7a', size: 2.5, in_use: true},
          {_id: 2, number: '7b', size: 5, in_use: true},
          {_id: 3, number: '72a', size: 4, in_use: true},
          {_id: 4, number: '72b', size: 2.5, in_use: true},
          {_id: 5, number: '72c', size: 2.5, in_use: false},
          {_id: 6, number: '72d', size: 2.5, in_use: false}
        ];

      return {
        query: function () {
          return example_plots;
        },
        get: function(params) {
          var result = {};
          angular.forEach(example_plots, function (plot) {
            if (plot._id == params._id)
              return this.plot = plot;
          }, result);
          return result.plot;
        },
        delete: function(params) {
          angular.forEach(example_plots, function(plot, index) {
            if (plot._id == params._id) {
              example_plots.splice(index, 1);
              return;
            }
          })
        },
        findByNumber: function(plots) {
          return $filter('filter')(example_plots, {number: '72a'} || {number: '7a'});
        },
        update: function(plot) {
          var item = this.get(plot);
          if (!item) return false;

          item.number = plot.number;
          item.size = plot.size;
          item.in_use = plot.in_use;

          return true;
        },

        create: function(plot) {
          plot._id = ++last_id;
          example_plots.push(plot);
        }
      }
    }
  );
