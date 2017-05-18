var contact = {
  bindings: {
    contact: '<',
    onSelect: '&',
    onOpen: '&',
    content: '@'
  },
  templateUrl: './contact.html',
  controller: 'ContactController'
};

angular
  .module('components.contact')
  .component('contact', contact);
