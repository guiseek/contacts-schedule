angular
  .module('components.auth', [
    'ui.router',
    'firebase'
  ])
  .config(function ($firebaseRefProvider) {

    let config = {
      apiKey: "AIzaSyCxQ0M5XOWKsjCtMvt-2qeKSZKPdBr2ApM",
      authDomain: "contact-schedule.firebaseapp.com",
      databaseURL: "https://contact-schedule.firebaseio.com",
      projectId: "contact-schedule",
      storageBucket: "contact-schedule.appspot.com",
      messagingSenderId: "1093402578851"
    }

    $firebaseRefProvider
      .registerUrl({
        default: config.databaseURL,
        contacts: config.databaseURL + '/contacts',
        tags: config.databaseURL + '/tags'
      })

    firebase.initializeApp(config)
  })
  .run(function ($transitions, $state, AuthService) {
    $transitions.onStart({
      to: function (state) {
        return !!(state.data && state.data.requiredAuth)
      }
    }, function() {
      return AuthService
        .requireAuthentication()
        .catch(function () {
          return $state.target('auth.login')
        })
    })
    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      if (AuthService.isAuthenticated()) {
        return $state.target('app')
      }
    })
  })
