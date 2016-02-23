angular.module('ngForge').provider('media', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using mediaDummy for playing images");
      }
      if (forge.dummy) {
        return this.mediaDummy(logger);
      } else {
        return this.forgeMedia(forge);
      }
    },
    mediaDummy: function(logger) {
      return {
        playerDummy: {
          play: function(success) {
            return typeof success === "function" ? success() : void 0;
          }
        },
        createAudioPlayer: function(file, success, error) {
          logger.info("create dummy player " + file);
          return typeof success === "function" ? success(this.playerDummy) : void 0;
        }
      };
    },
    forgeMedia: function(forge) {
      return forge.media;
    }
  };
});
