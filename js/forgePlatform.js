angular.module('ngForge').provider('platform', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using platformDummy for playing images");
      }
      if (forge.dummy) {
        return this.platformDummy();
      } else {
        return this.forgePlatform(forge);
      }
    },
    platformDummy: function() {
      return {
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
    },
    forgePlatform: function(forge) {
      return forge.platform;
    }
  };
});
