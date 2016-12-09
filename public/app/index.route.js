(function() {
  'use strict';

  angular

    .module('guildApp')

    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider

    .state('login', {
      url: '/',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'vm'
    });
    $urlRouterProvider.when('/home', '/home');
    $urlRouterProvider.otherwise('/');
  }
})();