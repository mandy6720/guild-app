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
      loginService.user.getUserByBnetId().then(function(res) {
        console.log(res.data); 
      }, function(res) {
        $state.go('register');
      });
    }

    

  }
})();