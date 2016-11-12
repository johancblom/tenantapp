angular.module('tenantappApp').controller('ModalCtrl', function ($modal, $log, $document) {
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size, parentSelector) {
    console.log("opening modal");
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $modal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
})
  .controller('ModalInstanceCtrl', function ($modalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
      item: $ctrl.items[0]
    };

    $ctrl.ok = function () {
      $modalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

