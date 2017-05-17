function ContactNewController(ContactService, $state) {
  let ctrl = this
  ctrl.$onInit = () => {
    ctrl.contact = {
      name: '',
      email: '',
      phone: '',
      job: '',
      location: '',
      social: {
        facebook: '',
        google: '',
        github: '',
        twitter: '',
        linkedin: ''
      },
      tag: 'none'
    }
  }
  ctrl.createNewContact = event => {
    return ContactService
      .createNewContact(event.contact)
      .then(contact => {
        $state.go('contact', {
          id: contact.key
        })
      })
  }
}

angular
  .module('components.contact')
  .controller('ContactNewController', ContactNewController)
