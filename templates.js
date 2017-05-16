angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div ui-view></div>');
$templateCache.put('./app-nav.html','<nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" ui-sref="contacts">Agenda de contatos</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"><ul class="nav navbar-nav"><li><a ui-sref="new"><i class="glyphicon glyphicon-plus"></i> Novo contato</a></li></ul><ul class="nav navbar-nav navbar-right"><li class="dropdown"><a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="glyphicon glyphicon-user"></i> <span ng-bind="::$ctrl.user.email"></span> <span class="caret"></span></a><ul class="dropdown-menu"><li><a href="" ng-click="$ctrl.onLogout();"><i class="glyphicon glyphicon-log-out"></i> Sair</a></li></ul></li></ul></div></div></nav>');
$templateCache.put('./app-sidebar.html','<aside class="panel panel-default"><div class="panel-heading">Etiquetas</div><contact-tags contact-tags="$ctrl.contactTags" on-select="$ctrl.selectTag($event);"></contact-tags><div class="panel-body"><contact-tag-detail tag="$ctrl.tag" on-save="$ctrl.createNewTag($event);" on-delete="$ctrl.deleteTag($event);" on-update="$ctrl.updateTag($event);"></contact-tag-detail></div></aside>');
$templateCache.put('./app.html','<app-nav user="$ctrl.user" on-logout="$ctrl.logout();"></app-nav><div class="container-fluid"><div class="row"><div class="col-md-2"><app-sidebar></app-sidebar></div><div class="col-md-10"><div ui-view></div></div></div></div>');
$templateCache.put('./auth-form.html','<form name="authForm" class="panel panel-default" novalidate ng-submit="$ctrl.submitForm();"><div class="panel-body"><div ng-if="$ctrl.message" class="alert alert-danger">{{ $ctrl.message }}</div><div class="form-group"><label for="email">Email</label><input type="email" name="email" class="form-control" id="email" ng-model="$ctrl.user.email" required></div><div class="form-group"><label for="password">Senha</label><input type="password" name="password" class="form-control" id="password" ng-model="$ctrl.user.password" required></div><div class="text-right"><button class="btn btn-primary" type="submit" ng-disabled="authForm.$invalid">{{ $ctrl.button }}</button></div></div></form>');
$templateCache.put('./login.html','<div class="row"><div class="col-md-4 col-md-offset-4"><h1>Acesso</h1><auth-form user="$ctrl.user" message="{{ $ctrl.error }}" button="Acessar conta" on-submit="$ctrl.loginUser($event);"></auth-form><div class="alert alert-info"><i class="glyphicon glyphicon-exclamation-sign"></i> <a ui-sref="auth.register">Ainda n\xE3o tem uma conta? Crie uma agora.</a></div></div></div>');
$templateCache.put('./register.html','<div class="row"><div class="col-md-4 col-md-offset-4"><h1>Cadastro</h1><auth-form user="$ctrl.user" message="{{ $ctrl.error }}" button="Criar conta" on-submit="$ctrl.createUser($event);"></auth-form><div class="alert alert-info"><i class="glyphicon glyphicon-exclamation-sign"></i> <a ui-sref="auth.login">J\xE1 tem uma conta? Fa\xE7a o login.</a></div></div></div>');
$templateCache.put('./contact.html','<div ng-click="$ctrl.selectContact();"><h4 class="list-group-item-heading" ng-bind="$ctrl.contact.name"></h4><p class="list-group-item-text"><span ng-bind="$ctrl.contact.email"></span> <small class="pull-right"><i class="glyphicon glyphicon-tag"></i> <span ng-bind="$ctrl.contact.tag.label"></span></small></p></div>');
$templateCache.put('./contact-detail.html','<div class="contact"><form name="contactDetailForm" novalidate><div class="row"><div class="col-md-6"><h3 class="page-header">Dados pessoais</h3><div class="form-group" data-ng-class="{\'has-error\':contactDetailForm.name.$invalid && contactDetailForm.name.$dirty}"><label>Name</label><input type="text" name="name" class="form-control" length-check required="required" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.name"></div><div class="form-group" data-ng-class="{\'has-error\':contactDetailForm.email.$invalid && contactDetailForm.email.$dirty}"><label>Email</label><input type="email" name="email" class="form-control" length-check ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.email"></div><div class="form-group"><label>Profiss\xE3o</label><input type="text" name="jobTitle" class="form-control" length-check ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.job"></div><div class="form-group"><label>Endere\xE7o</label><input type="text" name="location" class="form-control" length-check ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.location"></div></div><div class="col-md-6"><h3 class="page-header">Dados sociais</h3><div class="form-group"><label>Facebook</label><input type="text" name="facebook" class="form-control" length-check ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.facebook"></div><div class="form-group"><label>GitHub</label><input type="text" name="github" class="form-control" length-check ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.github"></div><div class="form-group"><label>Twitter</label><input type="text" name="twitter" class="form-control" length-check ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.twitter"></div><div class="form-group"><label>LinkedIn</label><input type="text" name="linkedin" class="form-control" length-check ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.linkedin"></div></div></div><div class="row"><div class="col-md-10"><contact-tag tag="$ctrl.contact.tag" on-change="$ctrl.tagChange($event);"></contact-tag></div><div class="col-md-2 text-right"><div class="navbar" ng-if="$ctrl.isNewContact"><button class="btn btn-success" ng-disabled="contactDetailForm.$invalid" ng-click="$ctrl.saveContact();">Salvar contato</button></div><div ng-if="!$ctrl.isNewContact"><button class="btn btn-danger" ng-click="$ctrl.deleteContact();">Apagar contato</button></div></div></div></form></div>');
$templateCache.put('./contact-edit.html','<contact-detail contact="$ctrl.contact" on-delete="$ctrl.deleteContact($event);" on-update="$ctrl.updateContact($event);"></contact-detail>');
$templateCache.put('./contact-new.html','<contact-detail contact="$ctrl.contact" on-save="$ctrl.createNewContact($event);"></contact-detail>');
$templateCache.put('./contact-tag.html','<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-tag"></i> Etiqueta</span><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn" ng-click="$ctrl.updateTag(tag);" ng-repeat="tag in $ctrl.tags" ng-class="{\'btn-success\': $ctrl.tag.state == tag.state,\'btn-default\': $ctrl.tag.state != tag.state}"><span ng-class="[tag.icon]"></span> <span ng-bind="tag.label"></span></button></div></div>');
$templateCache.put('./contact-tag-detail.html','<div class="tag"><form name="contactTagDetailForm" novalidate><div class="form-group"><label>Nome</label><input type="text" name="label" class="form-control" length-check required="required" ng-change="$ctrl.normalizeTag()" ng-model-options="{\n          \'updateOn\': \'default blur\',\n          \'debounce\': {\n            \'default\': 250,\n            \'blur\': 0\n          }\n        }" ng-model="$ctrl.tag.label"></div><div class="form-group"><label>\xCDcone</label><select name="icon" class="form-control" required="required" ng-model="$ctrl.tag.icon" ng-options="icon.class as icon.label for icon in $ctrl.icons"></select></div><div ng-if="!$ctrl.tag.$id"><button type="button" class="btn btn-success btn-block" ng-disabled="contactTagDetailForm.$invalid" ng-click="$ctrl.saveTag();">Criar tag</button></div><div ng-if="$ctrl.tag.$id"><div class="btn-group btn-group-justified" role="group" aria-label="..."><div class="btn-group" role="group"><button type="button" class="btn btn-default" ng-disabled="contactTagDetailForm.$invalid" ng-click="$ctrl.updateTag();">Alterar</button></div><div class="btn-group" role="group"><button type="button" class="btn btn-warning" ng-click="$ctrl.deleteTag();">Apagar</button></div></div></div></form></div>');
$templateCache.put('./contact-tags.html','<table class="table table-hover"><tr ng-repeat="item in $ctrl.contactTags" ui-sref-active-eq="active"><td><a ui-sref="contacts({ filter: item.state })"><i ng-class="[item.icon]"></i> <span ng-bind="item.label"></span></a></td><td class="text-right"><button type="button" class="btn btn-default btn-xs" ng-show="item.state != \'none\'" ng-click="$ctrl.selectTag(item)"><i class="glyphicon glyphicon-pencil"></i></button></td></tr></table>');
$templateCache.put('./contacts.html','<div class="list-group"><a class="list-group-item" ng-repeat="contact in $ctrl.filteredContacts"><contact contact="contact" on-select="$ctrl.goToContact($event);"></contact></a></div><div class="alert alert-warning" ng-if="!$ctrl.filteredContacts.length"><i class="glyphicon glyphicon-alert"></i> N\xE3o tem ningu\xE9m aqui...</div>');}]);