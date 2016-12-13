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
      var searchObject = $location.search();
      var path = $location.url();
      console.log('searchObject', searchObject);
      console.log('path', path);
      console.log($scope.logged_in_user)
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

  }
})();