angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div ui-view></div>');
$templateCache.put('./app-nav.html','<nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" ui-sref="contacts({filter: none})">Agenda de contatos</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"><ul class="nav navbar-nav"><li><a ui-sref="new"><i class="glyphicon glyphicon-plus"></i> Novo contato</a></li></ul><ul class="nav navbar-nav navbar-right"><li class="dropdown"><a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="glyphicon glyphicon-user"></i> <span ng-bind="::$ctrl.user.email"></span> <span class="caret"></span></a><ul class="dropdown-menu"><li><a href="" ng-click="$ctrl.onLogout();"><i class="glyphicon glyphicon-log-out"></i> Sair</a></li></ul></li></ul></div></div></nav>');
$templateCache.put('./app-sidebar.html','<aside class="panel panel-default"><div class="panel-heading">Etiquetas</div><contact-tags class="tags" contact-tags="$ctrl.contactTags" on-select="$ctrl.selectTag($event);"></contact-tags><div class="panel-body"><contact-tag-detail tag="$ctrl.tag" on-save="$ctrl.createNewTag($event);" on-delete="$ctrl.deleteTag($event);" on-update="$ctrl.updateTag($event);"></contact-tag-detail></div></aside>');
$templateCache.put('./app.html','<app-nav user="$ctrl.user" on-logout="$ctrl.logout();"></app-nav><div class="container-fluid"><div class="row"><div class="col-sm-3"><app-sidebar></app-sidebar></div><div class="col-sm-9"><div ui-view></div></div></div></div>');
$templateCache.put('./auth.html','<div class="container"><div class="row"><div class="col-md-4 col-md-offset-4"><div ui-view></div></div></div></div>');
$templateCache.put('./auth-form.html','<form name="authForm" class="panel panel-default" novalidate ng-submit="$ctrl.submitForm();"><div class="panel-body"><div ng-if="$ctrl.message" class="alert alert-danger">{{ $ctrl.message }}</div><div class="form-group"><label for="email">Email</label><input type="email" name="email" id="email" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-model="$ctrl.user.email" autocomplete="off" required></div><div class="form-group"><label for="password">Senha</label><input type="password" name="password" id="password" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-model="$ctrl.user.password" minlength="6" required></div><div class="text-right"><button class="btn btn-warning" type="reset"><i class="glyphicon glyphicon-remove"></i> {{ $ctrl.reset }}</button> <button class="btn btn-info" type="submit" ng-disabled="authForm.$invalid"><i class="glyphicon glyphicon-ok"></i> {{ $ctrl.button }}</button></div></div></form>');
$templateCache.put('./login.html','<h1>Acesso</h1><auth-form user="$ctrl.user" message="{{ $ctrl.error }}" button="Acessar conta" reset="Limpar" on-submit="$ctrl.loginUser($event);"></auth-form><div class="alert alert-info"><i class="glyphicon glyphicon-exclamation-sign"></i> <a ui-sref="auth.register">Ainda n\xE3o tem uma conta? Crie uma agora!</a></div>');
$templateCache.put('./register.html','<h1>Cadastro</h1><auth-form user="$ctrl.user" message="{{ $ctrl.error }}" reset="Limpar" button="Criar conta" on-submit="$ctrl.createUser($event);"></auth-form><div class="alert alert-info"><i class="glyphicon glyphicon-exclamation-sign"></i> <a ui-sref="auth.login">J\xE1 tem uma conta? Fa\xE7a o login!</a></div>');
$templateCache.put('./contact.html','<div class="panel panel-default"><div class="panel-heading"><span ng-bind="$ctrl.contact.name"></span> <i class="fa fa-user pull-right"></i></div><div class="panel-body"><div class="row"><div class="col-md-5 col-xs-12"><p><i class="fa fa-phone"></i> <a href="tel:{{$ctrl.contact.phone}}" ng-bind="$ctrl.contact.phone || \'Sem telefone\'"></a></p></div><div class="col-md-7 col-xs-12"><p><i class="fa fa-envelope-o"></i> <a href="https://mail.google.com/mail/?view=cm&fs=1&to=\'{{$ctrl.contact.name}}\' <{{$ctrl.contact.email}}>" target="_blank" ng-bind="$ctrl.contact.email || \'Sem email\'"></a></p></div><div class="col-md-5 col-xs-12"><p class="text-right"><a ui-sref="contacts({ filter: $ctrl.contact.tag.state })"><i class="fa fa-tag"></i> <span ng-bind="$ctrl.contact.tag.label || \'Sem etiqueta\'"></span></a></p></div><div ng-if="$ctrl.content == \'full\'" class="col-sm-7 col-xs-12"><p><i class="fa fa-laptop"></i> <span ng-bind="$ctrl.contact.job || \'Sem profiss\xE3o\'"></span></p></div><div ng-if="$ctrl.content == \'full\'" class="col-xs-12"><p><i class="fa fa-home"></i> <span ng-bind="$ctrl.contact.location || \'Sem endere\xE7o\'"></span></p></div></div></div><div class=""><div class="btn-group btn-group-justified btn-group-lg" role="group" aria-label="..."><a ng-if="$ctrl.content == \'full\' && $ctrl.contact.social.facebook" href="{{$ctrl.contact.social.facebook}}" target="_blank" class="btn btn-primary"><i class="fa fa-facebook-square"></i> </a><a ng-if="$ctrl.content == \'full\' && $ctrl.contact.social.google" href="{{$ctrl.contact.social.google}}" target="_blank" class="btn btn-danger"><i class="fa fa-google-plus"></i> </a><a ng-if="$ctrl.content == \'full\' && $ctrl.contact.social.github" href="{{$ctrl.contact.social.github}}" target="_blank" class="btn btn-success"><i class="fa fa-github"></i> </a><a ng-if="$ctrl.content == \'full\' && $ctrl.contact.social.twitter" href="{{$ctrl.contact.social.twitter}}" target="_blank" class="btn btn-info"><i class="fa fa-twitter"></i> </a><a ng-if="$ctrl.content == \'full\' && $ctrl.contact.social.linkedin" href="{{$ctrl.contact.social.linkedin}}" target="_blank" class="btn btn-primary"><i class="fa fa-linkedin"></i> </a><a ng-if="$ctrl.content == \'half\'" ng-click="$ctrl.openContact()" class="btn btn-info"><i class="fa fa-user-circle-o"></i> </a><a ng-click="$ctrl.selectContact()" class="btn btn-default"><i class="fa fa-pencil"></i></a></div></div></div>');
$templateCache.put('./contact-detail.html','<div class="contact"><form name="contactDetailForm" novalidate><div class="row"><div class="col-md-12 navbar"><contact-tag tag="$ctrl.contact.tag" on-change="$ctrl.tagChange($event);"></contact-tag></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label>Nome</label><input type="text" name="name" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" minlength="8" required ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.name"></div><div class="form-group"><label>Telefone</label><input type="text" name="phone" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" minlength="8" required ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.phone"></div><div class="form-group"><label>Email</label><input type="email" name="email" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" required ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.email"></div><div class="form-group"><label>Profiss\xE3o</label><input type="text" name="jobTitle" class="form-control" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.job"></div><div class="form-group"><label>Endere\xE7o</label><input type="text" name="location" class="form-control" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.location"></div></div><div class="col-md-6"><div class="form-group"><label>Facebook</label><input type="url" name="facebook" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.facebook"></div><div class="form-group"><label>Google+</label><input type="url" name="google" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.google"></div><div class="form-group"><label>GitHub</label><input type="url" name="github" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.github"></div><div class="form-group"><label>Twitter</label><input type="url" name="twitter" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.twitter"></div><div class="form-group"><label>LinkedIn</label><input type="url" name="linkedin" class="form-control" validate-class="{success: \'has-success\', \'error\': \'has-error\'}" ng-change="$ctrl.updateContact();" ng-model-options="{\n              \'updateOn\': \'default blur\',\n              \'debounce\': {\n                \'default\': 250,\n                \'blur\': 0\n              }\n            }" ng-model="$ctrl.contact.social.linkedin"></div></div></div><div class="row"><div class="col-md-12 navbar text-right"><button class="btn btn-warning" type="reset"><i class="glyphicon glyphicon-remove"></i> Limpar</button> <button ng-if="$ctrl.isNewContact" class="btn btn-success" ng-disabled="contactDetailForm.$invalid" ng-click="$ctrl.saveContact();"><i class="fa fa-check"></i> Salvar contato</button> <button ng-if="!$ctrl.isNewContact" class="btn btn-danger" ng-click="$ctrl.deleteContact();"><i class="fa fa-trash-o"></i> Apagar contato</button></div></div></form></div>');
$templateCache.put('./contact-edit.html','<contact-detail contact="$ctrl.contact" on-delete="$ctrl.deleteContact($event);" on-update="$ctrl.updateContact($event);"></contact-detail>');
$templateCache.put('./contact-new.html','<contact-detail contact="$ctrl.contact" on-save="$ctrl.createNewContact($event);"></contact-detail>');
$templateCache.put('./contact-tag.html','<div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-tag"></i> Etiqueta</span><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn" ng-click="$ctrl.updateTag(tag);" ng-repeat="tag in $ctrl.tags" ng-class="{\'btn-success\': $ctrl.tag.state == tag.state,\'btn-default\': $ctrl.tag.state != tag.state}"><span ng-class="[tag.icon]"></span> <span ng-bind="tag.label"></span></button></div></div>');
$templateCache.put('./contact-tag-detail.html','<div class="tag"><form name="contactTagDetailForm" novalidate><div class="form-group"><label>Descri\xE7\xE3o</label><input type="text" name="label" class="form-control" required ng-change="$ctrl.normalizeTag()" ng-model="$ctrl.tag.label"></div><div class="form-group"><label>\xCDcone</label><select name="icon" class="form-control" required ng-model="$ctrl.tag.icon" ng-options="icon.class as icon.label for icon in $ctrl.icons"></select></div><div ng-if="!$ctrl.tag.$id"><button type="button" class="btn btn-success btn-block" ng-disabled="contactTagDetailForm.$invalid" ng-click="$ctrl.saveTag();"><i class="fa fa-check"></i> Criar tag</button></div><div ng-if="$ctrl.tag.$id"><div class="btn-group btn-group-justified" role="group" aria-label="..."><div class="btn-group" role="group"><button type="button" class="btn btn-success" ng-disabled="contactTagDetailForm.$invalid" ng-click="$ctrl.updateTag();"><i class="fa fa-check"></i> Alterar</button></div><div class="btn-group" role="group"><button type="submit" class="btn btn-danger" ng-click="$ctrl.deleteTag();"><i class="fa fa-trash-o"></i> Apagar</button></div></div></div></form></div>');
$templateCache.put('./contact-tags.html','<table class="table table-hover contact-tags"><tr ng-repeat="item in $ctrl.contactTags" ui-sref-active-eq="active"><td><a ui-sref="contacts({ filter: item.state })"><i ng-class="[item.icon]"></i> <span ng-bind="item.label"></span></a></td><td class="text-right"><button type="button" class="btn btn-default btn-xs" ng-show="item.state != \'none\'" ng-click="$ctrl.selectTag(item)"><i class="glyphicon glyphicon-pencil"></i></button></td></tr></table>');
$templateCache.put('./contacts.html','<contacts-search search="$ctrl.search" on-update="$ctrl.updateSearch($event)" on-clear="$ctrl.updateSearch($event)"></contacts-search><div class="row" ng-if="$ctrl.filteredContacts.length"><div class="col-md-3" ng-repeat="contact in $ctrl.filteredContacts | filter: $ctrl.search"><contact contact="contact" content="half" on-select="$ctrl.goToContact($event)" on-open="$ctrl.openModalContact($event)"></contact></div></div><div class="alert alert-warning" ng-if="!$ctrl.filteredContacts.length"><i class="glyphicon glyphicon-alert"></i> Nenhum contato foi marcado com esta etiqueta ainda...</div><div class="modal fade" id="modalContact" tabindex="-1" role="dialog" aria-labelledby="modalContact" data-backdrop="false"><div class="modal-dialog modal-md" role="document"><contact contact="$ctrl.contactView" content="full" on-select="$ctrl.goToContact($event)"></contact><div class="text-center"><button type="button" class="modal-close btn btn-default pull-right" data-dismiss="modal" aria-label="Close"><i class="glyphicon glyphicon-remove text-warning"></i></button></div></div></div>');
$templateCache.put('./contacts-search.html','<div class="navbar"><div class="input-group"><span class="input-group-addon" id="search"><i class="glyphicon glyphicon-search"></i> </span><input type="text" class="form-control" placeholder="Buscar contato..." aria-describedby="search" ng-change="$ctrl.updateSearch()" ng-model-options="{\n        \'updateOn\': \'default blur\',\n        \'debounce\': {\n          \'default\': 600,\n          \'blur\': 0\n        }\n      }" ng-model="$ctrl.search"> <span class="input-group-addon" ng-click="$ctrl.clear()"><i class="glyphicon glyphicon-remove"></i></span></div></div>');}]);