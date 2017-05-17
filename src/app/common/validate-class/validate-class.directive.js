function validateClass() {
  return {
    restrict: 'A',
    require: 'ngModel',
    compile: function ($element) {
      let $parent = angular.element($element[0].parentElement || $element[0].parentNode)
      return function ($scope, $element, $attrs, $ctrl) {
        if (!!$attrs.validateClass) {
          let classes = $scope.$eval($attrs.validateClass)
          $scope.$watch(() => {
            return $ctrl.$viewValue
          }, newValue => {
            if ($ctrl.$dirty) {
              if ($ctrl.$invalid) {
                $parent.addClass(classes.error)
                $parent.removeClass(classes.success)
              } else {
                $parent.removeClass(classes.error)
                $parent.addClass(classes.success)
              }
            }
          })
        }
      }
    }
  }
}

angular
  .module('components.contact')
  .directive('validateClass', validateClass)
