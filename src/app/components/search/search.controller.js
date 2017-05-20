function SearchController() {
  let ctrl = this
  ctrl.updateSearch = () => {
    ctrl.onUpdate({
      $event: {
        search: ctrl.search
      }
    })
  }
  ctrl.clear = () => {
    ctrl.onClear({
      $event: {
        search: ''
      }
    })
  }
}

angular
  .module('components.search')
  .controller('SearchController', SearchController);
