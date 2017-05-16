function normalizeTag() {
  return function (string) {
    if (string) {
      let fromChars = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ ',
          toChars = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC-',
          output = '',
          i
      for (i = 0; i < string.length; i++) {
        if (fromChars.search(string.substr(i, 1)) >= 0) {
          output += toChars.substr(fromChars.search(string.substr(i, 1)), 1)
        } else {
          output += string.substr(i, 1)
        }
      }
      return output.toLowerCase()
    }
  }
}

angular
  .module('components.contact')
  .filter('normalizeTag', normalizeTag)
