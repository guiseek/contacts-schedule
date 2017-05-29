function validationClass() {
  return {
    restrict: 'A',
    require: 'ngModel',
    compile: function ($element) {
      let $parent = angular.element($element[0].parentElement || $element[0].parentNode)
      return function ($scope, $element, $attrs, $ctrl) {
        $scope.$watch(newValue => {
          if ($ctrl.$dirty) {
            if ($ctrl.$invalid) {
              $parent.addClass('has-error')
              $parent.removeClass('has-success')
            } else {
              $parent.removeClass('has-error')
              $parent.addClass('has-success')
            }
          } else {
            $parent.removeClass('has-error')
            $parent.removeClass('has-success')
          }
        })
      }
    }
  }
}

angular
  .module('common')
  .directive('validationClass', validationClass)
