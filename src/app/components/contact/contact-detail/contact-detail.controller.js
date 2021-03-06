function ContactDetailController() {
  let ctrl = this
  ctrl.$onInit = () => {
    ctrl.isNewContact = !ctrl.contact.$id
  }
  ctrl.saveContact = () => {
    ctrl.onSave({
      $event: {
        contact: ctrl.contact
      }
    })
  }
  ctrl.updateContact = () => {
    console.log(ctrl.contact)
    ctrl.onUpdate({
      $event: {
        contact: ctrl.contact
      }
    })
  }
  ctrl.deleteContact = () => {
    ctrl.onDelete({
      $event: {
        contact: ctrl.contact
      }
    })
  }
  ctrl.tagChange = event => {
    ctrl.contact.tag = event.tag
    ctrl.updateContact()
  }
}

angular
  .module('components.contact')
  .controller('ContactDetailController', ContactDetailController)
