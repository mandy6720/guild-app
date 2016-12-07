(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $rootScope, $http, loginService) {
    var vm = this;
    vm.activate = activate;
    vm.login = login;

    activate();

    function activate() {
      $rootScope.mainState = 'login';
      console.log($rootScope.mainState);
    }

    function login() {
      loginService.users.getAllUsers().then(function(res) {
        var validUser = res.filter(function(item) {
          return item.user.id == vm.user.username;
        })
        console.log(validUser)
      })
    }

  }
})();