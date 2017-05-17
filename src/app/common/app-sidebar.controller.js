function AppSidebarController(TagService, cfpLoadingBar) {
  let ctrl = this
  ctrl.srcTag = {
    label: '',
    state: ''
  }
  ctrl.tag = angular.copy(ctrl.srcTag)
  let resetTag = tag => ctrl.tag = ctrl.srcTag
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
