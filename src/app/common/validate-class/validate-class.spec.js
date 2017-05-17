describe('Common', function () {
  beforeEach(module('common'));

  describe('validateCçass', function () {
    var $rootScope,
      $compile,
      element;

    beforeEach(inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');

      $rootScope.model = { name: '' };
      element = angular.element('<input name="name" type="text" validate-class ng-model="model.name"></input>');
      $compile(element)($rootScope);
      $rootScope.$digest();
    }));

    // it('should contain dynamic-input class', function() {
    //   expect(element.hasClass('dynamic-input')).toEqual(true);
    // });

    it('should dynamically add success class', function() {
      var scope = element.scope();

      element.val('John Doe').triggerHandler('input');
      scope.$apply();

      expect(scope.model.name).toBe('John Doe');
      expect(element.hasClass('has-success')).toEqual(true);
      expect(element.hasClass('has-error')).toEqual(false);

      element.val('').triggerHandler('input');
      scope.$apply();

      expect(scope.model.name).toBe('');
      expect(element.hasClass('has-success')).toEqual(false);
      expect(element.hasClass('has-error')).toEqual(true);
    });
  });
});