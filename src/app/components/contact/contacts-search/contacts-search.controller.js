function ContactsSearchController() {
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
  .module('components.contact')
  .controller('ContactsSearchController', ContactsSearchController);
