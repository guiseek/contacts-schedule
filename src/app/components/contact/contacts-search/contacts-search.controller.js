function ContactsSearchController() {
  let ctrl = this
  ctrl.$onInit = () => {
  }
  ctrl.updateSearch = () => {
    ctrl.onUpdate({
      $event: {
        search: ctrl.search
      }
    })
  }
}

angular
  .module('components.contact')
  .controller('ContactsSearchController', ContactsSearchController);
