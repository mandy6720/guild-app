(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $scope, $rootScope, $http, $filter, loginService) {
    var vm = this;
    vm.activate = activate;
    vm.login = login;
    vm.loginBnet = loginBnet;

    activate();

    function activate() {
      console.log('activated');

    }

    function login() {
      loginService.users.getUserByUsername(vm.username).then(function(res) {
        console.log(res.data);
        if (res.data.length !== 0) {
          vm.noExisitingUser = false;
          var validPassword = res.data[0].password == vm.password;
          if (validPassword) {
            $rootScope.loggedInUser = res.data[0];
            $state.go('home');
          } else {
            vm.wrongPassword = 'That password is incorrect';
          }
        } else {
          vm.noExisitingUser = 'There is no user by that name';
        }
      })
    }

    function loginBnet() {
      $http.get('/auth/bnet')
    }

  }
})();