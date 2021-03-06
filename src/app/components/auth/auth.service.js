function AuthService($firebaseAuth) {
  let auth = $firebaseAuth()
  let authData = null
  function storeAuthData(response) {
    authData = response
    return authData
  }
  function onSignIn(user) {
    authData = user
    return auth.$requireSignIn()
  }
  function clearAuthData() {
    authData = null
  }
  this.login = function (user) {
    return auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then(storeAuthData)
  }
  this.google = function() {
    return auth
      .$signInWithPopup('google')
      .then(storeAuthData)
  }
  this.register = function (user) {
    return auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then(storeAuthData)
  }
  this.delete = function () {
    return auth
      .$deleteUser()
        .then(storeAuthData)
  }
  this.logout = function () {
    return auth
      .$signOut()
      .then(clearAuthData)
  }
  this.requireAuthentication = function () {
    return auth
      .$waitForSignIn().then(onSignIn)
  }
  this.isAuthenticated = function () {
    return !!authData
  }
  this.getUser = function () {
    if (authData) {
      return authData
    }
  }
}

angular
  .module('components.auth')
  .service('AuthService', AuthService)
