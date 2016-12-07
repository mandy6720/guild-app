(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($scope, $rootScope, $http, $filter) {
    var vm = this;
    vm.activate = activate;

    activate();

    function activate() {
      console.log('dashboard')
    }

    

  }
})();