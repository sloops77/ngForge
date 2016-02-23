angular.module('ngForge').provider('segmentio', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using segmentioDummy");
      }
      if (forge.dummy) {
        return this.segmentioDummy(logger);
      } else {
        return this.forgeSegmentio(forge);
      }
    },
    segmentioDummy: function(logger) {
      return {
        identify: function(userId, traits, success, error) {
          logger.debug("identify");
          return typeof success === "function" ? success() : void 0;
        },
        track: function(event, properties, success, error) {
          logger.debug("track");
          return typeof success === "function" ? success() : void 0;
        },
        screen: function(view, properties, success, error) {
          logger.debug("screen");
          return typeof success === "function" ? success() : void 0;
        }
      };
    },
    forgeSegmentio: function(forge) {
      return forge.segmentio;
    }
  };
});
