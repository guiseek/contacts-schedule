(function(angular){
'use strict';
angular
  .module('root', [
    'common',
    'components',
    'templates'
  ])})(window.angular);
(function(angular){
'use strict';
angular
  .module('common', [
    'ui.router',
    'angular-loading-bar'
  ])
  .run(["$transitions", "cfpLoadingBar", function ($transitions, cfpLoadingBar) {
    $transitions.onStart({}, cfpLoadingBar.start)
    $transitions.onSuccess({}, cfpLoadingBar.complete)
  }])
})(window.angular);
(function(angular){
'use strict';
angular
  .module('components', [
    'components.contact',
    'components.auth'
  ])
})(window.angular);
(function(angular){
'use strict';
angular
  .module('components.auth', [
    'ui.router',
    'firebase'
  ])
  .config(["$firebaseRefProvider", function ($firebaseRefProvider) {

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
  }])
  .run(["$transitions", "$state", "AuthService", function ($transitions, $state, AuthService) {
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
  }])
})(window.angular);
(function(angular){
'use strict';
angular
  .module('components.contact', [
    'ui.router'
  ])})(window.angular);
(function(angular){
'use strict';
let root = {
  templateUrl: './root.html'
}

angular
  .module('root')
  .component('root', root)
})(window.angular);
(function(angular){
'use strict';
let appNav = {
  bindings: {
    user: '<',
    onLogout: '&'
  },
  templateUrl: './app-nav.html'
}

angular
  .module('common')
  .component('appNav', appNav)
})(window.angular);
(function(angular){
'use strict';
let appSidebar = {
  templateUrl: './app-sidebar.html',
  controller: 'AppSidebarController'
}

angular
  .module('common')
  .component('appSidebar', appSidebar)
})(window.angular);
(function(angular){
'use strict';
AppSidebarController.$inject = ["TagService", "cfpLoadingBar"];
function AppSidebarController(TagService, cfpLoadingBar) {
  let ctrl = this
  ctrl.srcTag = {}
  ctrl.tag = angular.copy(ctrl.srcTag)
  let resetTag = tag => ctrl.tag = angular.copy(ctrl.srcTag)
  ctrl.$onInit = () => {
    TagService.getTagList().$loaded()
      .then(tags => {
        ctrl.contactTags = tags
        ctrl.contactTags.unshift({
          label: 'Todos contatos',
          state: 'none',
          icon: 'glyphicon glyphicon-tag'
        })
      })
  }
  ctrl.selectTag = event => {
    return TagService
      .getTagById(event.tag.$id).$loaded()
      .then(tag => ctrl.tag = tag)
  }
  ctrl.updateTag = event => {
    return TagService
      .updateTag(event.tag)
      .then(resetTag)
  }
  ctrl.deleteTag = event => {
    return TagService
      .deleteTag(event.tag)
      .then(resetTag)
  }
  ctrl.createNewTag = function (event) {
    TagService
      .createNewTag(event.tag)
      .then(resetTag)
  }
}

angular
  .module('common')
  .controller('AppSidebarController', AppSidebarController)
})(window.angular);
(function(angular){
'use strict';
let app = {
  templateUrl: './app.html',
  controller: 'AppController'
}

angular
  .module('common')
  .component('app', app)
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('app', {
        redirectTo: 'contacts',
        url: '/app',
        data: {
          requiredAuth: true
        },
        component: 'app'
      })
  }])
})(window.angular);
(function(angular){
'use strict';
AppController.$inject = ["AuthService", "$state"];
function AppController(AuthService, $state) {
  let ctrl = this
  ctrl.user = AuthService.getUser()

  ctrl.logout = function () {
    AuthService.logout().then(function () {
      $state.go('auth.login')
    })
  }
}

angular
  .module('common')
  .controller('AppController', AppController)
})(window.angular);
(function(angular){
'use strict';
function validateClass() {
  return {
    restrict: 'A',
    require: 'ngModel',
    compile: function ($element) {
      let $parent = angular.element($element[0].parentElement || $element[0].parentNode)
      return function ($scope, $element, $attrs, $ctrl) {
        if (!!$attrs.validateClass) {
          let classes = $scope.$eval($attrs.validateClass)
          $scope.$watch(newValue => {
            if ($ctrl.$dirty) {
              if ($ctrl.$invalid) {
                $parent.addClass(classes.error)
                $parent.removeClass(classes.success)
              } else {
                $parent.removeClass(classes.error)
                $parent.addClass(classes.success)
              }
            }
          })
        }
      }
    }
  }
}

angular
  .module('components.contact')
  .directive('validateClass', validateClass)
})(window.angular);
(function(angular){
'use strict';
AuthService.$inject = ["$firebaseAuth"];
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
  this.register = function (user) {
    return auth
      .$createUserWithEmailAndPassword(user.email, user.password)
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
})(window.angular);
(function(angular){
'use strict';
ContactService.$inject = ["AuthService", "$firebaseRef", "$firebaseArray", "$firebaseObject"];
function ContactService(AuthService, $firebaseRef, $firebaseArray, $firebaseObject) {
  let ref = $firebaseRef.contacts
  let uid = AuthService.getUser().uid
  return {
    createNewContact: function (contact) {
      return $firebaseArray(ref.child(uid)).$add(contact)
    },
    getContactById: function (id) {
      return $firebaseObject(ref.child(uid).child(id))
    },
    getContactList: function () {
      return $firebaseArray(ref.child(uid))
    },
    updateContact: function (contact) {
      return contact.$save()
    },
    deleteContact: function (contact) {
      return contact.$remove()
    }
  }
}

angular
  .module('components.contact')
  .factory('ContactService', ContactService)
})(window.angular);
(function(angular){
'use strict';
let auth = {
  templateUrl: './auth.html'
}

angular
  .module('components.auth')
  .component('auth', auth)
  .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        redirectTo: 'auth.login',
        url: '/auth',
        component: 'auth'
      })
    $urlRouterProvider.otherwise('/auth/login')
  }])
})(window.angular);
(function(angular){
'use strict';
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
})(window.angular);
(function(angular){
'use strict';
function AuthFormController() {
  let ctrl = this
  ctrl.$onChanges = changes => {
    if (changes.user) {
      ctrl.user = angular.copy(ctrl.user)
    }
  }
  ctrl.submitForm = () => {
    ctrl.onSubmit({
      $event: {
        user: ctrl.user
      }
    })
  }
}

angular
  .module('components.auth')
  .controller('AuthFormController', AuthFormController)
})(window.angular);
(function(angular){
'use strict';
let login = {
  templateUrl: './login.html',
  controller: 'LoginController'
}

angular
  .module('components.auth')
  .component('login', login)
  .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth.login', {
        url: '/login',
        component: 'login'
      })
    $urlRouterProvider.otherwise('/auth/login')
  }])
})(window.angular);
(function(angular){
'use strict';
LoginController.$inject = ["AuthService", "$state"];
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
}

angular
  .module('components.auth')
  .controller('LoginController', LoginController)
})(window.angular);
(function(angular){
'use strict';
let register = {
  templateUrl: './register.html',
  controller: 'RegisterController'
}

angular
  .module('components.auth')
  .component('register', register)
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('auth.register', {
        url: '/register',
        component: 'register'
      })
  }])
})(window.angular);
(function(angular){
'use strict';
RegisterController.$inject = ["AuthService", "$state"];
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
})(window.angular);
(function(angular){
'use strict';
var contact = {
  bindings: {
    contact: '<',
    onSelect: '&',
    onOpen: '&',
    content: '@'
  },
  templateUrl: './contact.html',
  controller: 'ContactController'
};

angular
  .module('components.contact')
  .component('contact', contact);
})(window.angular);
(function(angular){
'use strict';
function ContactController() {
  let ctrl = this;
  ctrl.openContact = () => {
    ctrl.onOpen({
      $event: {
        contact: ctrl.contact
      }
    })
  }
  ctrl.selectContact = () => {
    ctrl.onSelect({
      $event: {
        contactId: ctrl.contact.$id
      }
    })
  }
}

angular
  .module('components.contact')
  .controller('ContactController', ContactController)
})(window.angular);
(function(angular){
'use strict';
let contactDetail = {
  bindings: {
    contact: '<',
    onSave: '&',
    onUpdate: '&',
    onDelete: '&'
  },
  templateUrl: './contact-detail.html',
  controller: 'ContactDetailController'
};

angular
  .module('components.contact')
  .component('contactDetail', contactDetail);
})(window.angular);
(function(angular){
'use strict';
function ContactDetailController() {
  let ctrl = this
  ctrl.$onInit = () => {
    ctrl.isNewContact = !ctrl.contact.$id
  }
  ctrl.saveContact = () => {
    ctrl.onSave({
      $event: {
        contact: ctrl.contact
      }
    })
  }
  ctrl.updateContact = () => {
    ctrl.onUpdate({
      $event: {
        contact: ctrl.contact
      }
    })
  }
  ctrl.deleteContact = () => {
    ctrl.onDelete({
      $event: {
        contact: ctrl.contact
      }
    })
  }
  ctrl.tagChange = event => {
    ctrl.contact.tag = event.tag
    ctrl.updateContact()
  }
}

angular
  .module('components.contact')
  .controller('ContactDetailController', ContactDetailController)
})(window.angular);
(function(angular){
'use strict';
let contactEdit = {
  bindings: {
    contact: '<'
  },
  templateUrl: './contact-edit.html',
  controller: 'ContactEditController'
};

angular
  .module('components.contact')
  .component('contactEdit', contactEdit)
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('contact', {
        parent: 'app',
        url: '/contact/:id',
        component: 'contactEdit',
        resolve: {
          contact: ["$transition$", "ContactService", function ($transition$, ContactService) {
            let key = $transition$.params().id;
            return ContactService.getContactById(key).$loaded();
          }]
        }
      });
  }]);
})(window.angular);
(function(angular){
'use strict';
ContactEditController.$inject = ["$state", "ContactService", "cfpLoadingBar", "$window"];
function ContactEditController($state, ContactService, cfpLoadingBar, $window) {
  let ctrl = this

  ctrl.updateContact = event => {
    cfpLoadingBar.start()
    return ContactService
      .updateContact(event.contact)
      .then(cfpLoadingBar.complete, cfpLoadingBar.complete)
  }
  ctrl.deleteContact = event => {
    let message = `Delete ${event.contact.name} from contacts?`
    if ($window.confirm(message)) {
      return ContactService
        .deleteContact(event.contact)
        .then(() => {
          $state.go('contacts');
        })
    }
  }
}

angular
  .module('components.contact')
  .controller('ContactEditController', ContactEditController);
})(window.angular);
(function(angular){
'use strict';
let contactNew = {
  templateUrl: './contact-new.html',
  controller: 'ContactNewController'
};

angular
  .module('components.contact')
  .component('contactNew', contactNew)
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('new', {
        parent: 'app',
        url: '/new',
        component: 'contactNew'
      });
  }]);
})(window.angular);
(function(angular){
'use strict';
ContactNewController.$inject = ["ContactService", "$state"];
function ContactNewController(ContactService, $state) {
  let ctrl = this
  ctrl.$onInit = () => {
    ctrl.contact = {
      name: '',
      email: '',
      phone: '',
      job: '',
      location: '',
      social: {
        facebook: '',
        google: '',
        github: '',
        twitter: '',
        linkedin: ''
      },
      tag: 'none'
    }
  }
  ctrl.createNewContact = event => {
    return ContactService
      .createNewContact(event.contact)
      .then(contact => {
        $state.go('contact', {
          id: contact.key
        })
      })
  }
}

angular
  .module('components.contact')
  .controller('ContactNewController', ContactNewController)
})(window.angular);
(function(angular){
'use strict';
let contactTag = {
  bindings: {
    tag: '<',
    onChange: '&'
  },
  templateUrl: './contact-tag.html',
  controller: 'ContactTagController'
}

angular
  .module('components.contact')
  .component('contactTag', contactTag)
})(window.angular);
(function(angular){
'use strict';
ContactTagController.$inject = ["TagService"];
function ContactTagController(TagService) {
  let ctrl = this
  ctrl.$onInit = () => {
    TagService.getTagList().$loaded()
      .then(tags => ctrl.tags = tags)
  }

  ctrl.updateTag = tag => {
    ctrl.onChange({
      $event: {
        tag: tag
      }
    })
  }
}

angular
  .module('components.contact')
  .controller('ContactTagController', ContactTagController)
})(window.angular);
(function(angular){
'use strict';
TagService.$inject = ["AuthService", "$firebaseRef", "$firebaseArray", "$firebaseObject"];
function TagService(AuthService, $firebaseRef, $firebaseArray, $firebaseObject) {
  let ref = $firebaseRef.tags
  let uid = AuthService.getUser().uid
  return {
    createNewTag: function (tag) {
      return $firebaseArray(ref.child(uid)).$add(tag)
    },
    getTagById: function (id) {
      return $firebaseObject(ref.child(uid).child(id))
    },
    getTagList: function () {
      return $firebaseArray(ref.child(uid))
    },
    updateTag: function (tag) {
      return tag.$save()
    },
    deleteTag: function (tag) {
      return tag.$remove()
    }
  }
}

angular
  .module('components.contact')
  .factory('TagService', TagService)
})(window.angular);
(function(angular){
'use strict';
function normalizeTag() {
  return function (string) {
    if (string) {
      let fromChars = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ ',
          toChars = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC-',
          output = '',
          i
      for (i = 0; i < string.length; i++) {
        if (fromChars.search(string.substr(i, 1)) >= 0) {
          output += toChars.substr(fromChars.search(string.substr(i, 1)), 1)
        } else {
          output += string.substr(i, 1)
        }
      }
      return output.toLowerCase()
    }
  }
}

angular
  .module('components.contact')
  .filter('normalizeTag', normalizeTag)
})(window.angular);
(function(angular){
'use strict';
let contactTagDetail = {
  bindings: {
    tag: '<',
    onSave: '&',
    onUpdate: '&',
    onDelete: '&'    
  },
  templateUrl: './contact-tag-detail.html',
  controller: 'ContactTagDetailController'
}

angular
  .module('components.contact')
  .component('contactTagDetail', contactTagDetail)
})(window.angular);
(function(angular){
'use strict';
ContactTagDetailController.$inject = ["$filter", "TagService"];
function ContactTagDetailController($filter, TagService) {
  let ctrl = this
  
  ctrl.normalizeTag = () => {
    ctrl.tag.state = $filter('normalizeTag')(ctrl.tag.label)
  }
  ctrl.icons = [
    {label: 'Estrela', class: 'glyphicon glyphicon-star'},
    {label: 'Mão direita', class: 'glyphicon glyphicon-hand-right'},
    {label: 'Coração', class: 'glyphicon glyphicon-heart-empty'},
    {label: 'Mão afirmativa', class: 'glyphicon glyphicon-thumbs-up'},
    {label: 'Educação', class: 'glyphicon glyphicon-education'},
    {label: 'Trabalho', class: 'glyphicon glyphicon-briefcase'},
    {label: 'Olho aberto', class: 'glyphicon glyphicon-eye-open'},
    {label: 'Etiqueta', class: 'glyphicon glyphicon-tag'}
  ]
  ctrl.saveTag = () => {
    ctrl.onSave({
      $event: {
        tag: ctrl.tag
      }
    })
  }
  ctrl.updateTag = () => {
    ctrl.onUpdate({
      $event: {
        tag: ctrl.tag
      }
    })
  }
  ctrl.deleteTag = () => {
    ctrl.onDelete({
      $event: {
        tag: ctrl.tag
      }
    })
  }
}

angular
  .module('components.contact')
  .controller('ContactTagDetailController', ContactTagDetailController)
})(window.angular);
(function(angular){
'use strict';
let contactTags = {
  bindings: {
    contactTags: '<',
    onSelect: '&'
  },
  templateUrl: './contact-tags.html',
  controller: 'ContactTagsController'
}

angular
  .module('components.contact')
  .component('contactTags', contactTags)
})(window.angular);
(function(angular){
'use strict';
function ContactTagsController() {
  let ctrl = this

  ctrl.selectTag = tag => {
    ctrl.onSelect({
      $event: {
        tag: tag
      }
    })
  }
}

angular
  .module('components.contact')
  .controller('ContactTagsController', ContactTagsController)
})(window.angular);
(function(angular){
'use strict';
let contacts = {
  bindings: {
    contacts: '<',
    filter: '<'
  },
  templateUrl: './contacts.html',
  controller: 'ContactsController'
}

angular
  .module('components.contact')
  .component('contacts', contacts)
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('contacts', {
        parent: 'app',
        url: '/contacts?filter',
        component: 'contacts',
        params: {
          filter: {
            value: 'none'
          }
        },
        resolve: {
          contacts: ["ContactService", function (ContactService) {
            return ContactService.getContactList().$loaded()
          }],
          filter: ["$transition$", function ($transition$) {
            return $transition$.params()
          }]
        }
      })
  }])
})(window.angular);
(function(angular){
'use strict';
ContactsController.$inject = ["$filter", "$state"];
function ContactsController($filter, $state) {
  let ctrl = this

  ctrl.$onInit = () => {
    ctrl.filteredContacts = $filter('contactsFilter')(ctrl.contacts, ctrl.filter)
  }
  ctrl.updateSearch = event => {
    ctrl.search = event.search
  }
  ctrl.openModalContact = event => {
    ctrl.contactView = event.contact
    $('#modalContact').modal('show')
  }
  ctrl.goToContact = event => {
    if (ctrl.contactView) {
      ctrl.contactView = null
      $('#modalContact').modal('hide')
      $('#modalContact').on('hidden.bs.modal', function (e) {
        $state.go('contact', {
          id: event.contactId
        })
      })
    } else {
      $state.go('contact', {
        id: event.contactId
      })
    }
  }
}

angular
  .module('components.contact')
  .controller('ContactsController', ContactsController)
})(window.angular);
(function(angular){
'use strict';
function contactsFilter() {
  return (collection, params) => {
    return collection.filter(item => {
      return item.tag.state === (
        params.filter === 'none' ? item.tag.state : params.filter
      )
    })
  }
}

angular
  .module('components.contact')
  .filter('contactsFilter', contactsFilter)
})(window.angular);
(function(angular){
'use strict';
let contactsSearch = {
  bindings: {
    onUpdate: '&',
    onClear: '&'
  },
  templateUrl: './contacts-search.html',
  controller: 'ContactsSearchController'
};

angular
  .module('components.contact')
  .component('contactsSearch', contactsSearch);
})(window.angular);
(function(angular){
'use strict';
function ContactsSearchController() {
  let ctrl = this
  ctrl.$onInit = () => {
  }
  ctrl.updateSearch = () => {
    ctrl.onUpdate({
      $event: {
        search: ctrl.search
      }
    })
  }
}

angular
  .module('components.contact')
  .controller('ContactsSearchController', ContactsSearchController);
})(window.angular);
(function(angular){
'use strict';
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div ui-view></div>');
$templateCache.put('./app-nav.html','<nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" ui-sref="contacts({filter: none})">Agenda de contatos</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"><ul class="nav navbar-nav"><li><a ui-sref="new"><i class="glyphicon glyphicon-plus"></i> Novo contato</a></li></ul><ul class="nav navbar-nav navbar-right"><li class="dropdown"><a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="glyphicon glyphicon-user"></i> <span ng-bind="::$ctrl.user.email"></span> <span class="caret"></span></a><ul class="dropdown-menu"><li><a href="" ng-click="$ctrl.onLogout();"><i class="glyphicon glyphicon-log-out"></i> Sair</a></li></ul></li></ul></div></div></nav>');
$templateCache.put('./app-sidebar.html','<aside class="panel panel-default"><div class="panel-heading">Etiquetas</div><contact-tags class="tags" contact-tags="$ctrl.contactTags" on-select="$ctrl.selectTag($event);"></contact-tags><div class="panel-body"><contact-tag-detail tag="$ctrl.tag" on-save="$ctrl.createNewTag($event);" on-delete="$ctrl.deleteTag($event);" on-update="$ctrl.updateTag($event);"></contact-tag-detail></div></aside>');
$templateCache.put('./app.html','<app-nav user="$ctrl.user" on-logout="$ctrl.logout();"></app-nav><div class="container-fluid"><div class="row"><div class="col-sm-3"><app-sidebar></app-sidebar></div><div class="col-sm-9"><div ui-view></div></div></div></div>');
$templateCache.put('./auth.html','<div class="container"><div class="row"><div class="col-md-4 col-md-offset-4"><div ui-view></div></div></div></div>');
$templateCache.put('./auth-form.html','<form name="authForm" class="panel panel-default" novalidate ng-submit="$ctrl.submitForm();"><div class="panel-body"><div ng-if="$ctrl.message" class="alert alert-danger">{{ $ctrl.message }}</div><div class="form-group"><label for="email">Email</label><input type="email" name="email" id="email" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-model="$ctrl.user.email" autocomplete="off" required></div><div class="form-group"><label for="password">Senha</label><input type="password" name="password" id="password" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-model="$ctrl.user.password" minlength="6" required></div><div class="text-right"><button class="btn btn-warning" type="reset"><i class="glyphicon glyphicon-remove"></i> {{ $ctrl.reset }}</button> <button class="btn btn-info" type="submit" ng-disabled="authForm.$invalid"><i class="glyphicon glyphicon-ok"></i> {{ $ctrl.button }}</button></div></div></form>');
$templateCache.put('./login.html','<h1>Acesso</h1><auth-form user="$ctrl.user" message="{{ $ctrl.error }}" button="Acessar conta" reset="Limpar" on-submit="$ctrl.loginUser($event);"></auth-form><div class="alert alert-info"><i class="glyphicon glyphicon-exclamation-sign"></i> <a ui-sref="auth.register">Ainda n\xE3o tem uma conta? Crie uma agora!</a></div>');
$templateCache.put('./register.html','<h1>Cadastro</h1><auth-form user="$ctrl.user" message="{{ $ctrl.error }}" reset="Limpar" button="Criar conta" on-submit="$ctrl.createUser($event);"></auth-form><div class="alert alert-info"><i class="glyphicon glyphicon-exclamation-sign"></i> <a ui-sref="auth.login">J\xE1 tem uma conta? Fa\xE7a o login!</a></div>');
$templateCache.put('./contact.html','<div class="panel panel-default"><div class="panel-heading" ng-bind="$ctrl.contact.name"></div><div class="panel-body"><div class="row"><div class="col-sm-5 col-xs-12"><p><i class="fa fa-phone"></i> <span ng-bind="$ctrl.contact.phone || \'Sem telefone\'"></span></p></div><div class="col-sm-7 col-xs-12"><p><i class="fa fa-envelope-o"></i> <span ng-bind="$ctrl.contact.email || \'Sem email\'"></span></p></div><div ng-if="$ctrl.content == \'full\'" class="col-sm-5 col-xs-12"><p><i class="fa fa-tag"></i> <span ng-bind="$ctrl.contact.tag.label || \'Sem etiqueta\'"></span></p></div><div ng-if="$ctrl.content == \'full\'" class="col-sm-7 col-xs-12"><p><i class="fa fa-laptop"></i> <span ng-bind="$ctrl.contact.job || \'Sem profiss\xE3o\'"></span></p></div><div ng-if="$ctrl.content == \'full\'" class="col-xs-12"><p><i class="fa fa-home"></i> <span ng-bind="$ctrl.contact.location || \'Sem endere\xE7o\'"></span></p></div></div></div><div class=""><div class="btn-group btn-group-justified btn-group-lg" role="group" aria-label="..."><a ng-if="$ctrl.content == \'full\' && $ctrl.contact.social.facebook" href="{{$ctrl.contact.social.facebook}}" target="_blank" class="btn btn-primary"><i class="fa fa-facebook-square"></i> </a><a ng-if="$ctrl.content == \'full\' && $ctrl.contact.social.google" href="{{$ctrl.contact.social.google}}" target="_blank" class="btn btn-danger"><i class="fa fa-google-plus"></i> </a><a ng-if="$ctrl.content == \'full\' && $ctrl.contact.social.github" href="{{$ctrl.contact.social.github}}" target="_blank" class="btn btn-success"><i class="fa fa-github"></i> </a><a ng-if="$ctrl.content == \'full\' && $ctrl.contact.social.twitter" href="{{$ctrl.contact.social.twitter}}" target="_blank" class="btn btn-info"><i class="fa fa-twitter"></i> </a><a ng-if="$ctrl.content == \'full\' && $ctrl.contact.social.linkedin" href="{{$ctrl.contact.social.linkedin}}" target="_blank" class="btn btn-primary"><i class="fa fa-linkedin"></i> </a><a ng-if="$ctrl.content == \'half\'" ng-click="$ctrl.openContact()" class="btn btn-info"><i class="fa fa-user-circle-o"></i> </a><a ng-click="$ctrl.selectContact()" class="btn btn-default"><i class="fa fa-pencil"></i></a></div></div></div>');
$templateCache.put('./contact-detail.html','<div class="contact"><form name="contactDetailForm" novalidate><div class="row"><div class="col-md-12 navbar"><contact-tag tag="$ctrl.contact.tag" on-change="$ctrl.tagChange($event);"></contact-tag></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>Nome</label><input type="text" name="name" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" minlength="8" required ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.name"></div><div class="form-group"><label>Telefone</label><input type="text" name="phone" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" minlength="8" required ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.phone"></div><div class="form-group"><label>Email</label><input type="email" name="email" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" required ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.email"></div><div class="form-group"><label>Profiss\xE3o</label><input type="text" name="jobTitle" class="form-control" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.job"></div><div class="form-group"><label>Endere\xE7o</label><input type="text" name="location" class="form-control" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.location"></div></div><div class="col-md-6"><div class="form-group"><label>Facebook</label><input type="url" name="facebook" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.facebook"></div><div class="form-group"><label>Google+</label><input type="url" name="google" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.google"></div><div class="form-group"><label>GitHub</label><input type="url" name="github" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.github"></div><div class="form-group"><label>Twitter</label><input type="url" name="twitter" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.twitter"></div><div class="form-group"><label>LinkedIn</label><input type="url" name="linkedin" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.linkedin"></div></div></div><div class="row"><div class="col-md-12 navbar text-right"><button class="btn btn-warning" type="reset"><i class="glyphicon glyphicon-remove"></i> Limpar</button> <button ng-if="$ctrl.isNewContact" class="btn btn-success" ng-disabled="contactDetailForm.$invalid" ng-click="$ctrl.saveContact();"><i class="fa fa-check"></i> Salvar contato</button> <button ng-if="!$ctrl.isNewContact" class="btn btn-danger" ng-click="$ctrl.deleteContact();"><i class="fa fa-trash-o"></i> Apagar contato</button></div></div></form></div>');
$templateCache.put('./contact-edit.html','<contact-detail contact="$ctrl.contact" on-delete="$ctrl.deleteContact($event);" on-update="$ctrl.updateContact($event);"></contact-detail>');
$templateCache.put('./contact-new.html','<contact-detail contact="$ctrl.contact" on-save="$ctrl.createNewContact($event);"></contact-detail>');
$templateCache.put('./contact-tag.html','<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-tag"></i> Etiqueta</span><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn" ng-click="$ctrl.updateTag(tag);" ng-repeat="tag in $ctrl.tags" ng-class="{\'btn-success\': $ctrl.tag.state == tag.state,\'btn-default\': $ctrl.tag.state != tag.state}"><span ng-class="[tag.icon]"></span> <span ng-bind="tag.label"></span></button></div></div>');
$templateCache.put('./contact-tag-detail.html','<div class="tag"><form name="contactTagDetailForm" novalidate><div class="form-group"><label>Descri\xE7\xE3o</label><input type="text" name="label" class="form-control" required ng-change="$ctrl.normalizeTag()" ng-model="$ctrl.tag.label"></div><div class="form-group"><label>\xCDcone</label><select name="icon" class="form-control" required ng-model="$ctrl.tag.icon" ng-options="icon.class as icon.label for icon in $ctrl.icons"></select></div><div ng-if="!$ctrl.tag.$id"><button type="button" class="btn btn-success btn-block" ng-disabled="contactTagDetailForm.$invalid" ng-click="$ctrl.saveTag();"><i class="fa fa-check"></i> Criar tag</button></div><div ng-if="$ctrl.tag.$id"><div class="btn-group btn-group-justified" role="group" aria-label="..."><div class="btn-group" role="group"><button type="button" class="btn btn-success" ng-disabled="contactTagDetailForm.$invalid" ng-click="$ctrl.updateTag();"><i class="fa fa-check"></i> Alterar</button></div><div class="btn-group" role="group"><button type="submit" class="btn btn-danger" ng-click="$ctrl.deleteTag();"><i class="fa fa-trash-o"></i> Apagar</button></div></div></div></form></div>');
$templateCache.put('./contact-tags.html','<table class="table table-hover contact-tags"><tr ng-repeat="item in $ctrl.contactTags" ui-sref-active-eq="active"><td><a ui-sref="contacts({ filter: item.state })"><i ng-class="[item.icon]"></i> <span ng-bind="item.label"></span></a></td><td class="text-right"><button type="button" class="btn btn-default btn-xs" ng-show="item.state != \'none\'" ng-click="$ctrl.selectTag(item)"><i class="glyphicon glyphicon-pencil"></i></button></td></tr></table>');
$templateCache.put('./contacts.html','<contacts-search on-update="$ctrl.updateSearch($event)"></contacts-search><div class="row" ng-if="$ctrl.filteredContacts.length"><div class="col-md-6" ng-repeat="contact in $ctrl.filteredContacts | filter: $ctrl.search"><contact contact="contact" content="half" on-select="$ctrl.goToContact($event)" on-open="$ctrl.openModalContact($event)"></contact></div></div><div class="alert alert-warning" ng-if="!$ctrl.filteredContacts.length"><i class="glyphicon glyphicon-alert"></i> Nenhum contato foi marcado com esta etiqueta ainda...</div><div class="modal fade" id="modalContact" tabindex="-1" role="dialog" aria-labelledby="modalContact"><div class="modal-dialog modal-md" role="document"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><contact contact="$ctrl.contactView" content="full" on-select="$ctrl.goToContact($event)"></contact></div></div>');
$templateCache.put('./contacts-search.html','<div class="navbar"><div class="input-group"><span class="input-group-addon" id="search"><i class="glyphicon glyphicon-search"></i> </span><input type="text" class="form-control" placeholder="Buscar contato..." aria-describedby="search" ng-change="$ctrl.updateSearch()" ng-model-options="{\n        \'updateOn\': \'default blur\',\n        \'debounce\': {\n          \'default\': 600,\n          \'blur\': 0\n        }\n      }" ng-model="$ctrl.search"></div></div>');}]);})(window.angular);