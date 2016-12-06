(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $rootScope) {
    var vm = this;
    vm.activate = activate;
    vm.submitInfo = submitInfo;

    activate();

    function activate() {
      $rootScope.mainState = 'login';
      console.log($rootScope.mainState);
    }

    function submitInfo() {
      console.log(vm.user)
    }

  }
})();