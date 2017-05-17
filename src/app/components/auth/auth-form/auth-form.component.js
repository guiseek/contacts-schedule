let authForm = {
  bindings: {
    user: '<',
    button: '@',
    reset: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './auth-form.html',
  controller: 'AuthFormController'
}

angular
  .module('components.auth')
  .component('authForm', authForm)
