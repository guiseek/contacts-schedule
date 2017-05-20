let appNav = {
  bindings: {
    user: '<',
    onLogout: '&'
  },
  templateUrl: './app-nav.html',
  controller: 'AppNavController'
}

angular
  .module('common')
  .component('appNav', appNav)
