let search = {
  bindings: {
    search: '<',
    onUpdate: '&',
    onClear: '&'
  },
  templateUrl: './search.html',
  controller: 'SearchController'
}

angular
  .module('components.search')
  .component('search', search)
