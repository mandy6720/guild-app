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
        getUserByUsername: function(username) {
          return $http({
            method: 'GET',
            cache: true,
            url: url + '/users/' + username
          });
        },
        getCurrentUser: function() {
          return $http({
            method: 'GET',
            cache: true,
            url: url + '/current_user'
          });
        }

      };

      return {
        users: users
      };
    }

})();
