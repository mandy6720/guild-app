(function() {
  'use strict';

  angular
    .module('guildApp')
    .factory('loginService', loginService);

    function loginService($q, $cacheFactory, $http) {
      var url = 'https://illidari-shadows.herokuapp.com/api/';
      var users = {

        getAllUsers: function(){
          return $q(function (resolve) {
            
            var httpCache = $cacheFactory.get('$http');
            httpCache.removeAll();

            return $http({
                method: 'GET',
                cache: true,
                url: url + '/users'
            });
          });
        }
      };

      return {
        users: users
      };
    }

})();
