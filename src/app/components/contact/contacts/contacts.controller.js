function ContactsController($filter, $state) {
  let ctrl = this

  ctrl.$onInit = () => {
    ctrl.filteredContacts = $filter('contactsFilter')(ctrl.contacts, ctrl.filter)
  }
  ctrl.updateSearch = event => {
    ctrl.search = event.search
  }
  ctrl.openModalContact = event => {
    ctrl.contactView = event.contact
    $('#modalContact').modal('show')
  }
  ctrl.goToContact = event => {
    if (ctrl.contactView) {
      ctrl.contactView = null
      $('#modalContact').modal('hide')
      $('#modalContact').on('hidden.bs.modal', function (e) {
        $state.go('contact', {
          id: event.contactId
        })
      })
    } else {
      $state.go('contact', {
        id: event.contactId
      })
    }
  }
}

angular
  .module('components.contact')
  .controller('ContactsController', ContactsController)
