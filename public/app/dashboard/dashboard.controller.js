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
      loginService.user.getAllUsers().then(function(res) {
        console.log(res.data); 
      });
    }

    

  }
})();