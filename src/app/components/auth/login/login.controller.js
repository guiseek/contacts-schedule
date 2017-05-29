function LoginController(AuthService, $state) {
  let ctrl = this
  ctrl.$onInit = () => {
    ctrl.error = null
    ctrl.user = {
      email: '',
      password: ''
    }
  }
  ctrl.loginUser = event => {
    return AuthService
      .login(event.user)
      .then(() => {
        $state.go('app')
      }, reason => {
        ctrl.error = reason.message
      })
  }
  ctrl.loginGoogle = () => {
    return AuthService
      .google()
      .then(() => {
        $state.go('app')
      }, reason => {
        ctrl.error = reason.message
      })
  }}

angular
  .module('components.auth')
  .controller('LoginController', LoginController)
