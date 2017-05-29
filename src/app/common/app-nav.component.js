let appNav = {
  bindings: {
    user: '<',
    onLogout: '&',
    onDelete: '&'
  },
  templateUrl: './app-nav.html',
  controller: 'AppNavController'
}

angular
  .module('common')
  .component('appNav', appNav)
