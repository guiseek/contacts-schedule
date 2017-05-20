function AppNavController(TagService, cfpLoadingBar) {
  let ctrl = this

  ctrl.$onInit = () => {
    $(document).ready(function () {
      $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active')
      })
    })
  }
  ctrl.offcanvas = () => {
    $('.row-offcanvas').toggleClass('active')
  }
}

angular
  .module('common')
  .controller('AppNavController', AppNavController)
