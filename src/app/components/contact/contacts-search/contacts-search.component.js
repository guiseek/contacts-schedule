let contactsSearch = {
  bindings: {
    search: '<',
    onUpdate: '&',
    onClear: '&'
  },
  templateUrl: './contacts-search.html',
  controller: 'ContactsSearchController'
};

angular
  .module('components.contact')
  .component('contactsSearch', contactsSearch);
