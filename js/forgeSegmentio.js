angular.module('ngForge').provider('$forgeSegmentio', function() {
  'use strict';

  return {
    $get: [
      '$injector', '$q', '$forge', '$forgeLogger', 'ngForgeUtils', function($injector, $q, $forge, $forgeLogger, ngForgeUtils) {
        var forgeSegmentioDummy;
        forgeSegmentioDummy = {
          identify: function(userId, traits, success, error) {
            $forgeLogger.debug("identify");
            return typeof success === "function" ? success() : void 0;
          },
          track: function(event, properties, success, error) {
            $forgeLogger.debug("track");
            return typeof success === "function" ? success() : void 0;
          },
          screen: function(view, properties, success, error) {
            $forgeLogger.debug("screen");
            return typeof success === "function" ? success() : void 0;
          }
        };
        return ngForgeUtils.liftObject($forge.dummy ? forgeSegmentioDummy : forge.segmentio);
      }
    ]
  };
});
