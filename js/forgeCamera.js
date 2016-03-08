angular.module('ngForge').provider('$forgeCamera', function() {
  'use strict';

  return {
    $get: ['$forge', 'ngForgeUtils', function($forge, ngForgeUtils) {
      var ngCamera = {
        getImage: function() {
          success = ngForgeUtils.isFunction(arguments[0]) ? arguments[0] : arguments[1];
          return success();
        }
      };
      return ngForgeUtils.liftObject($forge.dummy ? ngCamera : forge.camera);
    }]
  };
});
