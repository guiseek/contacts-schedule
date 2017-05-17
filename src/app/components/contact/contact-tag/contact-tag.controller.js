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
