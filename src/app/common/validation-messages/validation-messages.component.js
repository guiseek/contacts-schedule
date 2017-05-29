let validationMessages = {
  bindings: {
    field: '<',
    label: '@'
  },
  templateUrl: './validation-messages.html',
  controller: 'ValidationMessagesController'
}

angular
  .module('common')
  .component('validationMessages', validationMessages)
