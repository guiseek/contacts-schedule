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
