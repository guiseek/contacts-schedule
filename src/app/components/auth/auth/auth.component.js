let auth = {
  templateUrl: './auth.html'
}

angular
  .module('components.auth')
  .component('auth', auth)
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        redirectTo: 'auth.login',
        url: '/auth',
        component: 'auth'
      })
    $urlRouterProvider.otherwise('/auth/login')
  })
