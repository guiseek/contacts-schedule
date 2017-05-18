function ContactController() {
  let ctrl = this;
  ctrl.openContact = () => {
    ctrl.onOpen({
      $event: {
        contact: ctrl.contact
      }
    })
  }
  ctrl.selectContact = () => {
    ctrl.onSelect({
      $event: {
        contactId: ctrl.contact.$id
      }
    })
  }
}

angular
  .module('components.contact')
  .controller('ContactController', ContactController)
