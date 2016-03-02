angular.module('ngForge').provider('$forgeSegmentio', function() {
  'use strict';

  return {
    $get: [
      '$injector', '$q', 'forge', 'logger', 'ngForgeUtils', function($injector, $q, forge, logger, ngForgeUtils) {
        var forgeSegmentioDummy;
        forgeSegmentioDummy = {
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
        return ngForgeUtils.liftObject(forge.dummy ? forgeSegmentioDummy : forge.segmentio);
      }
    ]
  };
});
