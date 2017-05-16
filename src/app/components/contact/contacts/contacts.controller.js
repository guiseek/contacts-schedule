function ContactsController($filter, $state) {
  let ctrl = this

  ctrl.$onInit = () => {
    ctrl.filteredContacts = $filter('contactsFilter')(ctrl.contacts, ctrl.filter)
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
