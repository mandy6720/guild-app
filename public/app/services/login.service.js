(function() {
  'use strict';

  angular
    .module('guildApp')
    .factory('loginService', loginService);

    function loginService($q, $cacheFactory, $http) {
      var url = 'https://illidari-shadows.herokuapp.com/api/';
      var users = {

        getAllUsers: function(username){
          var username = username;
          return $q(function (resolve) {
            
            var httpCache = $cacheFactory.get('$http');
            httpCache.removeAll();

            return $http(requestParams({
                method: 'GET',
                cache: true,
                url: url + '/users/' + username
            }));

          
          });
        }

      };

      return {
        users: users
      };
    }

})();
