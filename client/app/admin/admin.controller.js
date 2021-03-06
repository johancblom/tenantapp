'use strict';

angular.module('tenantappApp')
  .controller('AdminCtrl', function($scope, $http, Auth, User, Modal) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    /*$scope.delete = function(user) {
      User.remove({ id: user._id });
      $scope.users.splice(this.$index, 1);
    };*/
    $scope.delete = Modal.confirm.delete(function(user) {
      User.remove({id: user._id});
    })
  });
