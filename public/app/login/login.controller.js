(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $scope, $rootScope, $http, $filter, $location, loginService, charService) {
    var vm = this;
    vm.activate = activate;
    vm.logOut = logOut;

    logOut();
    activate();

    function activate() {
      //setTimeout(logIn, 500);
    }

    function logIn() {
      loginService.user.getCurrentUser().then(function(res){
        if (res.token) {
          $rootScope.loggedInUser = res;
          console.log($rootScope.loggedInUser)
          checkGuild($rootScope.loggedInUser.token);
        }
      });
      charService.char.getClasses().then(function(res) {
        $rootScope.classes = res.classes;
      });
    }

    function checkGuild(token) {
      loginService.user.getCharacters(token).then(function(res) {
        var chars = res.characters;
        var inGuild = chars.filter(function(char) {
          return char.guild == "Forbidden Nights" && char.guildRealm =="Dalaran"
        });
        if (inGuild.length !== 0) {
          $rootScope.chars = inGuild;
          $state.go('home');
        } else {
          vm.errMsg = 'You don\'t have any characters in this guild';
        }
      })
    }

    function logOut() {
      console.log('logging out');
      loginService.user.logOut(function(res) {
        console.log(res)
      });
      //$location.url('/logout');
    }

  }
})();