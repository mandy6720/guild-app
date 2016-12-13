(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $scope, $rootScope, $http, $filter, $location, loginService) {
    var vm = this;
    vm.activate = activate;

    activate();

    function activate() {
      loginService.user.getCurrentUser().then(function(res){
        console.log(res.data.data);
        if (res.data.data.token) {
          $rootScope.loggedInUser = res.data.data;
          checkGuild($rootScope.loggedInUser.token);
        }
      });
    }

    function checkGuild(token) {
      loginService.user.getCharacters(token).then(function(res) {
        var chars = res.data.characters;
        var inGuild = chars.filter(function(char) {
          return char.guild == "Illidari Shadows" && char.guildRealm =="Dalara"
        });
        if (inGuild) {
          $rootScope.chars = inGuild;
          console.log(inGuild);
          $state.go('home');
        } else {
          vm.errMsg = 'You don\'t have any characters in this guild';
        }
      })
    }

  }
})();