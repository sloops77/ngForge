angular.module('ngForge').provider('sms', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using smsDummy for playing images");
      }
      if (forge.dummy) {
        return this.smsDummy(logger);
      } else {
        return this.forgeSms(forge);
      }
    },
    smsDummy: function(logger) {
      return {
        send: function(params, success, error) {
          logger.debug("sms.send " + params.body + " to " + (JSON.stringify(params.to)));
          return typeof success === "function" ? success() : void 0;
        }
      };
    },
    forgeSms: function(forge) {
      return forge.sms;
    }
  };
});
