function RegisterController(AuthService, $state) {
  let ctrl = this
  ctrl.$onInit = () => {
    ctrl.error = null
    ctrl.user = {
      email: '',
      password: ''
    }
  }
  ctrl.createUser = event => {
    return AuthService
      .register(event.user)
      .then(() => {
        $state.go('app')
      }, reason => {
        ctrl.error = reason.message
      })
  }
}

angular
  .module('components.auth')
  .controller('RegisterController', RegisterController)
