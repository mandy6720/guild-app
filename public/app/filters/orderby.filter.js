(function() {
  'use strict';

  angular
    .module('guildApp')
    .filter('orderObjBy', orderObjBy);

  /** @ngInject */
  function orderObjBy() {
    
    return function(input, attribute) {
      if (!angular.isObject(input)) return input;

      var array = [];
      for(var objectKey in input) {
        array.push(input[objectKey]);
      }
      // orders by descending values
      array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return b - a;
      });
      return array;
    }
  }
})();