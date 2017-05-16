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
