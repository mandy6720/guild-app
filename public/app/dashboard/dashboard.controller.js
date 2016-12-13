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
      console.log($rootScope.loggedInUser);
      loginService.user.getUserByBnetId($rootScope.loggedInUser.id).then(function(res) {
        if (!res.data.length) {
          $state.go('register');
        } else {
          console.log(res.data[0]); 
        }
      });
    }

    

  }
})();