function ValidadeMessagesController($locale) {
  let ctrl = this,
      messages = $locale.VALIDATE_MESSAGES,
      attrsKey = ['max','maxlength','ngMaxlength','min','minlength','ngMinlength'],
      attrsVal = {},
      extra = {}

  ctrl.$onInit = () => {
    ctrl.messages = []
  }
  ctrl.$doCheck = () => {
    attrsKey.map(key => {
      extra[key] = ctrl.error.$$attr[key]
    })
    ctrl.messages = []
    return Object.keys(ctrl.error.$error)
      .map(key => ctrl.messages.push(messages[key].replace(/%s/g, ctrl.label).replace(/%i/g, extra[key]).replace(',','')))
  }
}

angular
  .module('common')
  .controller('ValidadeMessagesController', ValidadeMessagesController)
