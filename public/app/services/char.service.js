(function() {
  'use strict';

  angular
    .module('guildApp')
    .factory('charService', charService);

    function charService($q, $cacheFactory, $http, config) {
      var url = config.baseUrl;
      var bnetUrl = config.bnetUrl;
      var apiKey = config.clientID;
      
      var char = {

        getClasses: function() {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();
          return $q(function (resolve) {
              $http({
                method: 'GET',
                cache: true,
                url: bnetUrl + 'data/character/classes?locale=en_US&apikey=' + apiKey
              }).then(function(response) {
              resolve(response.data);
            });
          });
        }

      };

      return {
        char: char
      };
    }

})();
