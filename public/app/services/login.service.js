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

        getAllUsers: function() {
          return $q(function (resolve) {
              $http({
                method: 'GET',
                cache: true,
                url: url + '/users'
              }).then(function(response) {
              resolve(response.data.data);
            });
          });
        },
        getUserByBnetId: function(bnet_id) {
          return $q(function (resolve) {
              $http({
                method: 'GET',
                cache: true,
                url: url + '/users/bnet_id/' + bnet_id
              }).then(function(response) {
              resolve(response.data);
            });
          });
        },
        getCurrentUser: function() {
          return $q(function (resolve) {
              $http({
                method: 'GET',
                cache: true,
                url: url + '/login'
              }).then(function(response) {
              resolve(response.data.data);
            });
          });
        },
        createUser: function(userObj) {
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
                cache: true,
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
