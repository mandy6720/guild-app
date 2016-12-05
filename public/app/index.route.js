(function() {
  'use strict';

  angular

    .module('guildApp')

    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    });

    $urlRouterProvider.otherwise('/');
  }
})();