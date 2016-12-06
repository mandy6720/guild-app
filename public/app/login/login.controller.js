(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $rootScope, $http) {
    var vm = this;
    vm.activate = activate;
    vm.login = login;

    activate();

    function activate() {
      $rootScope.mainState = 'login';
      console.log($rootScope.mainState);
    }

    function login() {
      $http.get({
        method: 'GET',
        url: 'http://illidari-shadows.herokuapp.com/api/users'
      }).then(function(res){
        console.log(res)
      })
    }

  }
})();