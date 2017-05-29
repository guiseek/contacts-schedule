angular
  .module("ngLocale", [], ["$provide", function($provide) {
    $provide.value("$locale", {
      "VALIDATE_MESSAGES": {
        email: 'O %s deve ser válido',
        max: 'O valor máximo do campo %s é %i',
        maxlength: 'O campo %s deve ter no máximo %i letras',
        min: 'O valor mínimo do campo %s é %i',
        minlength: 'O campo %s deve ter no mínimo %i letras',
        required: 'O campo %s é obrigatório',
        number: 'Este campo não aceita números',
        pattern: 'O campo %s tem restrições baseadas em %i',
        url: 'URL inválida',
        date: 'Data inválida',
        datetimeLocal: 'Data ou hora inválida',
        time: 'Horário inválido'
      }
    })
  }])