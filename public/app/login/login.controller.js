(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $rootScope) {
    var vm = this;
    vm.activate = activate;

    activate();

    function activate() {
      $rootScope.mainState = 'agora';
      console.log($rootScope.mainState);
    }

  }
})();