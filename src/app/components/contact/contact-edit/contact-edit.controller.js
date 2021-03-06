function ContactEditController($state, ContactService, cfpLoadingBar, $window) {
  let ctrl = this

  ctrl.updateContact = event => {
    cfpLoadingBar.start()
    return ContactService
      .updateContact(event.contact)
      .then(cfpLoadingBar.complete, cfpLoadingBar.complete)
  }
  ctrl.deleteContact = event => {
    let message = `Apagar ${event.contact.name} dos contatos?`
    if ($window.confirm(message)) {
      return ContactService
        .deleteContact(event.contact)
        .then(() => {
          $state.go('contacts')
        })
    }
  }
}

angular
  .module('components.contact')
  .controller('ContactEditController', ContactEditController)
