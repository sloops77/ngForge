angular.module('ngForge').provider('$forgePlatform', function() {
  'use strinct';
  return {
    $get: [
      '$injector', '$q', '$forge', 'ngForgeUtils', function($injector, $q, $forge, ngForgeUtils) {
        var forgePlatform, platformDummy;
        platformDummy = {
          getModel: function(success, error) {
            return success('X');
          },
          getVersion: function(success, error) {
            return success('1');
          },
          getAPILevel: function(success, error) {
            return success('1');
          },
          getManufacturer: function(success, error) {
            return success('X');
          }
        };
        forgePlatform = $forge.dummy ? platformDummy : forge.platform;
        return ngForgeUtils.liftObject(forgePlatform);
      }
    ]
  };
});
