(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($state, $rootScope, $filter, loginService) {
    var vm = this;
    vm.activate = activate;

    activate();

    function activate() {
      if (!$rootScope.loggedInUser) {
        $state.go('login');
      } else if ($rootScope.loggedInUser.isAuthorized) {
        console.log('created', $rootScope.loggedInUser);
        vm.user = $rootScope.loggedInUser;
      } else {
        loginService.user.getUserByBnetId($rootScope.loggedInUser.id).then(function(res) {
          if (!res.length) {
            $state.go('register');
          } else {
            console.log('user', res[0]); 
            vm.user = $rootScope.loggedInUser;
          }
        });
      }
    }


  }
})();