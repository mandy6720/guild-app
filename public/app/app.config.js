(function() {
  'use strict';

   angular
     .module('guildApp')
     .constant('config', {
     	clientID: 'mzep2n5bsxt55p6q262w29rca3zuf3jt',
			clientSecret: 'YkJQjMHTW5WhnrZAcDW3zRaPs2gKUDKB',
			baseUrl:'https://illidari-shadows.herokuapp.com/api',
			bnetUrl: 'https://us.api.battle.net/wow/',
			thumbnailUrl: 'http://render-api-us.worldofwarcraft.com/static-render/us/'
    });

})();