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
      } 
      loginService.user.getUserByBnetId($rootScope.loggedInUser.id).then(function(res) {
        console.log(res)
        if (!res.length) {
          $state.go('register');
        } else {
          console.log(res[0]); 
        }
      });
    }


  }
})();