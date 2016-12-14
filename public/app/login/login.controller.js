(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $scope, $rootScope, $http, $filter, $location, loginService, charService) {
    var vm = this;
    vm.activate = activate;
    vm.authorize = authorize;

    activate();

    function activate() {
      loginService.user.getCurrentUser().then(function(res){
        if (res.token) {
          $rootScope.loggedInUser = res;
          checkGuild($rootScope.loggedInUser.token);
        }
      });
      charService.char.getClasses().then(function(res) {
        $rootScope.classes = res.classes;
      });
    }

    function authorize() {
      loginService.user.authenticate();
    }

    function checkGuild(token) {
      loginService.user.getCharacters(token).then(function(res) {
        var chars = res.characters;
        var inGuild = chars.filter(function(char) {
          return char.guild == "Illidari Shadows" && char.guildRealm =="Dalaran"
        });
        if (inGuild.length !== 0) {
          $rootScope.chars = inGuild;
          $state.go('home');
        } else {
          vm.errMsg = 'You don\'t have any characters in this guild';
        }
      })
    }

  }
})();