angular.module('ngForge').provider('$forgeLaunchimage', function() {
  'use strict';

  return {
    $get: ['$forge', 'ngForgeUtils', function($forge, ngForgeUtils) {
      var ngLaunchimage = {
        hide: function(success, error) {
          return success();
        }
      };
      return ngForgeUtils.liftObject($forge.dummy ? ngLaunchimage : forge.launchimage);
    }]
  };
});
