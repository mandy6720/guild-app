(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $scope, $rootScope, $http, $filter, $location, loginService) {
    var vm = this;
    vm.activate = activate;
    vm.login = login;

    activate();

    function activate() {
      console.log('activated');
      loginService.user.getCurrentUser().then(function(res){
        console.log(res.data);
      });
    }

    function login() {
      loginService.user.getCharacters().then(function(res) {
        console.log(res)
      })
    }

  }
})();