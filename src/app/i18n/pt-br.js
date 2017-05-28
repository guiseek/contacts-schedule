angular
  .module("ngLocale", [], ["$provide", function($provide) {
    $provide.value("$locale", {
      "VALIDATE_MESSAGES": {
        email: 'O %s deve ser válido',
        max: 'O máximo é %s, diminua',
        maxlength: 'O máximo é $s, diminua as letras',
        min: 'O mínimo é %s, continue',
        minlength: 'Seu %s deve ter no mínimo %i letras',
        required: 'O campo %s é obrigatório',
        number: 'Este campo não aceita números',
        pattern: 'Entrada aceita baseada em %s',
        url: 'Apenas endereços válidos',
        date: 'Entre com uma data válida',
        datetimeLocal: 'Entre com uma data de local válida',
        time: 'Entre com um horário válido'
      }
    })
  }])