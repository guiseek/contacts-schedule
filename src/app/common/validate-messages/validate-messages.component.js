let validateMessages = {
  bindings: {
    error: '<',
    label: '@'
  },
  templateUrl: './validate-messages.html',
  controller: 'ValidadeMessagesController'
}

angular
  .module('common')
  .component('validateMessages', validateMessages)
