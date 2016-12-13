(function() {
  'use strict';

  angular
    .module('guildApp')
    .factory('loginService', loginService);

    function loginService($q, $cacheFactory, $http) {
      var url = 'https://illidari-shadows.herokuapp.com/api';
      var devUrl = 'http://localhost:5000/api'
      var users = {

        getAllUsers: function(){
          return $http({
            method: 'GET',
            cache: true,
            url: url + '/users'
          });
        },
        getCurrentUser: function() {
          return $http({
            method: 'GET',
            cache: true,
            url: url + '/login'
          });
        },
        getCharacters: function(token) {
          return $http({
            method: 'GET',
            cache: true,
            url: 'https://us.api.battle.net/wow/user/characters?access_token=' + token
          });
        }

      };

      return {
        user: users
      };
    }

})();
