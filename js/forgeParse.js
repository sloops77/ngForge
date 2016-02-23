angular.module('ngForge').provider('parse', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, forgeUtils, logger) {
      if (forge.dummy) {
        logger.debug("using parseDummy for notifications");
      }
      if (forge.dummy) {
        return this.parseDummy(forgeUtils, logger);
      } else {
        return this.forgeParse(forge);
      }
    },
    parseDummy: function(forgeUtils, logger) {
      var dummyChannels;
      dummyChannels = [''];
      return {
        installationInfo: function(f) {
          logger.info('parseDummy info');
          return f({
            id: -696969
          });
        },
        registerForNotifications: function(success, error) {
          return success();
        },
        push: {
          subscribe: function(channel, success, error) {
            logger.info("subscribing to " + channel);
            if (!forgeUtils.includes(dummyChannels, channel)) {
              dummyChannels.push(channel);
            }
            return typeof success === "function" ? success() : void 0;
          },
          unsubscribe: function(channel, success, error) {
            logger.info("unsubscribing from " + channel);
            dummyChannels = forgeUtils.without(dummyChannels, channel);
            return typeof success === "function" ? success() : void 0;
          },
          subscribedChannels: function(success, error) {
            return typeof success === "function" ? success(dummyChannels) : void 0;
          }
        }
      };
    },
    forgeParse: function(forge) {
      return forge.parse;
    }
  };
});
