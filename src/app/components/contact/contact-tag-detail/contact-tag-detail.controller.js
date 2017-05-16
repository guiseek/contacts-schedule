function ContactTagDetailController($filter, TagService) {
  let ctrl = this
  
  ctrl.normalizeTag = () => {
    ctrl.tag.state = $filter('normalizeTag')(ctrl.tag.label)
  }
  ctrl.icons = [
    {label: 'Estrela', class: 'glyphicon glyphicon-star'},
    {label: 'Mão direita', class: 'glyphicon glyphicon-hand-right'},
    {label: 'Coração', class: 'glyphicon glyphicon-heart-empty'},
    {label: 'Mão afirmativa', class: 'glyphicon glyphicon-thumbs-up'},
    {label: 'Educação', class: 'glyphicon glyphicon-education'},
    {label: 'Trabalho', class: 'glyphicon glyphicon-briefcase'},
    {label: 'Olho aberto', class: 'glyphicon glyphicon-eye-open'},
    {label: 'Etiqueta', class: 'glyphicon glyphicon-tag'}
  ]
  ctrl.saveTag = () => {
    ctrl.onSave({
      $event: {
        tag: ctrl.tag
      }
    })
  }
  ctrl.updateTag = () => {
    ctrl.onUpdate({
      $event: {
        tag: ctrl.tag
      }
    })
  }
  ctrl.deleteTag = () => {
    ctrl.onDelete({
      $event: {
        tag: ctrl.tag
      }
    })
  }
}

angular
  .module('components.contact')
  .controller('ContactTagDetailController', ContactTagDetailController)
