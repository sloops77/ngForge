angular.module('ngForge').provider('$forgeSms', function() {
  'use strict';

  return {
    $get: [
      '$injector', '$q', 'forge', 'logger', 'ngForgeUtils', function($injector, $q, forge, logger, ngForgeUtils) {
        var smsDummy;
        smsDummy = {
          send: function(params, success, error) {
            logger.debug("$forgeSms.send " + params.body + " to " + (JSON.stringify(params.to)));
            return typeof success === "function" ? success() : void 0;
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? smsDummy : forge.sms);
      }
    ]
  };
});
