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
      console.log($rootScope.loggedInUser)
      if (!$rootScope.loggedInUser) {
        $state.go('login');
      }
      loginService.user.getUserByBnetId($rootScope.loggedInUser).then(function(res) {
        if (!res.length) {
          $state.go('register');
        } else {
          console.log(res[0]); 
        }
      });
    }


  }
})();