(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $rootScope, $http) {
    var vm = this;
    vm.activate = activate;
    vm.submitInfo = submitInfo;
    vm.login = login;

    activate();

    function activate() {
      $rootScope.mainState = 'login';
      console.log($rootScope.mainState);
    }

    function submitInfo() {
      console.log(vm.user)
    }

    function login() {
      $http.get({
        method: 'GET',
        url: '/users'
      }).then(function(res){
        console.log(res)
      })
    }

  }
})();