let authForm = {
  bindings: {
    user: '<',
    button: '@',
    reset: '@',
    message: '@',
    onSubmit: '&',
    onGoogle: '&'
  },
  templateUrl: './auth-form.html',
  controller: 'AuthFormController'
}

angular
  .module('components.auth')
  .component('authForm', authForm)
