'use strict';

angular.module('tenantappApp')
  .filter('inUsePlots', function() {
    return function(items, showInUse) {
       var resultArr = []; 
       angular.forEach(items, function(item) {
           if (item.in_use == false || showInUse == true) {
               resultArr.push(item);
           }
      });
      return resultArr;
   }}); 
