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
