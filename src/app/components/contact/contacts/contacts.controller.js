function ContactsController($filter, $state) {
  let ctrl = this
  let filtrate = () => {
    return $filter('contactsFilter')(ctrl.contacts, ctrl.filter)
  }
  ctrl.$onInit = () => {
    ctrl.contacts.$watch(() => {
      ctrl.filteredContacts = filtrate()
    })
    ctrl.filteredContacts = filtrate()
  }
  ctrl.updateSearch = event => {
    ctrl.search = event.search
  }
  ctrl.openModalContact = event => {
    ctrl.contactView = event.contact
    $('#modalContact').modal('show')
  }
  ctrl.goToContact = event => {
    $state.go('contact', {
      id: event.contactId
    })
  }
}

angular
  .module('components.contact')
  .controller('ContactsController', ContactsController)
