(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($state, $rootScope, $filter, loginService) {
    var vm = this;
    vm.activate = activate;

    activate();

    function activate() {
      console.log($rootScope.loggedInUser);
    }

    

  }
})();