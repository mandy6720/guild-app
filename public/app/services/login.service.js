(function() {
  'use strict';

  angular
    .module('guildApp')
    .factory('loginService', loginService);

    function loginService($q, $cacheFactory, $http, config) {
      var url = config.baseUrl;
      var bnetUrl = config.bnetUrl;
      var apiKey = config.clientID;

      var users = {
        authenticate: function(){
          $window.location.href = config.baseUrl + '/auth/bnet?foo=123';
        },
        getAllUsers: function() {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();
          return $q(function (resolve) {
              $http({
                method: 'GET',
                cache: false,
                url: url + '/users'
              }).then(function(response) {
              resolve(response.data.data);
            });
          });
        },
        getUserByBnetId: function(bnet_id) {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();
          return $q(function (resolve) {
              $http({
                method: 'GET',
                cache: false,
                url: url + '/users/bnet_id/' + bnet_id
              }).then(function(response) {
              resolve(response.data);
            });
          });
        },
        getCurrentUser: function() {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();
          return $q(function (resolve) {
              $http({
                method: 'GET',
                cache: false,
                url: url + '/login'
              }).then(function(response) {
              resolve(response.data.data);
            });
          });
        },
        createUser: function(userObj) {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();
          var user = JSON.stringify(userObj);
          return $http({
            method: 'POST', 
            url: url + '/users', 
            data: user,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        },
        getCharacters: function(token) {
          return $q(function (resolve) {
              $http({
                method: 'GET',
                cache: false,
                url: bnetUrl + 'user/characters?access_token=' + token
              }).then(function(response) {
              resolve(response.data);
            });
          });
        }

      };

      return {
        user: users
      };
    }

})();
