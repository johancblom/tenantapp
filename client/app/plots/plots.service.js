'use strict';

angular.module('tenantappApp')
  .factory('Plot', function($filter) {
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
        findByNumber: function(plots) {
          return $filter('filter')(example_plots, {number: '72a'} || {number: '7a'});
        },
        save: function (plot) {
          example_plots.filter(function(v) {
            console.log("Checking: " + v._id + " against: " + plot._id);
            return v._id === plot._id;
          })[0].in_use = plot.in_use;
        }
      }
    }
  );
