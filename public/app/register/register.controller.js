(function() {
  'use strict';

  angular
    .module('guildApp')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($state, $rootScope, $filter, config, loginService, charService) {
    var vm = this;
    vm.activate = activate;
    vm.submitInfo = submitInfo;
    vm.setMain = setMain;

    activate();

    function activate() {
      if (!$rootScope.loggedInUser) {
        $state.go('login');
      } else {
        vm.chars = $rootScope.chars;
        vm.chars.forEach(function(char) {
          var classObj = $rootScope.classes.filter(function(cl) {
            return cl.id == char.class;
          });
          char.classObj = classObj[0];
          char.thumbnailUrl = config.thumbnailUrl + char.thumbnail + '?alt=wow/static/images/2d/avatar/' + char.race + '-' + char.gender + '.jpg';
        });
        console.log(vm.chars)
      }
    }

    function submitInfo() {
      if (!vm.nickname && !vm.main) {
        vm.errMsg = 'Please select a nickname and a main';
      } else if (!vm.nickname) {
        vm.errMsg = 'Please select a nickname';
      } else if (!vm.main) {
        vm.errMsg = 'Please select a main';
      } else {
        vm.errMsg = false;
        var profile = {
          nickname: vm.nickname,
          main: vm.main.name
        }
        var userObj = {
          bnet_id: $rootScope.loggedInUser.id,
          profile: profile
        }
        loginService.user.createUser(userObj).then(function(res) {
          $rootScope.user = res;
          $rootScope.isAuthorized = true;
          $state.go('home');
        });
      }
    }

    function setMain(char, event) {
      angular.element(document.querySelectorAll('.selected-char')[0]).removeClass('selected-char');
      angular.element(event.currentTarget).addClass('selected-char')
      vm.main = char;
    }

  }
})();