function AppController(AuthService, $state) {
  let ctrl = this
  ctrl.user = AuthService.getUser()

  ctrl.logout = function () {
    AuthService.logout().then(function () {
      $state.go('auth.login')
    })
  }
  ctrl.delete = function () {
    AuthService.delete().then(function() {
      $state.go('auth.login')
    })
  }
}

angular
  .module('common')
  .controller('AppController', AppController)
