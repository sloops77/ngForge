angular.module('ngForge').provider('$forgeMedia', function() {
  'use strict';

  return {
    $get: ['$injector', '$q', 'forge', 'logger', 'ngForgeUtils', function($injector, $q, forge, logger, ngForgeUtils) {
        var mediaDummy;
        mediaDummy = {
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
        return ngForgeUtils.liftObject(forge.dummy ? mediaDummy : forge.media);
      }
    ]
  };
});
