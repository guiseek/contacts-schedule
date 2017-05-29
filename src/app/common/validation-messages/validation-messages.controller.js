function ValidationMessagesController($locale) {
  let ctrl = this,
      messages = $locale.VALIDATE_MESSAGES,
      attrsKey = ['max','maxlength','ngMaxlength','min','minlength','ngMinlength'],
      attrsVal = {}

  let clearMessages = () => ctrl.messages = []

  ctrl.$onInit = () => {
    clearMessages()
  }
  ctrl.$doCheck = () => {
    if (ctrl.field) {
      clearMessages()
      attrsKey.map(key => attrsVal[key] = ctrl.field.$$attr[key])
      Object.keys(ctrl.field.$error)
        .map(key => {
          ctrl.messages.push(
            messages[key]
              .replace(/%s/g, ctrl.label)
              .replace(/%i/g, attrsVal[key])
              .replace(',','')
          )
        })
    }
  }
}

angular
  .module('common')
  .controller('ValidationMessagesController', ValidationMessagesController)
