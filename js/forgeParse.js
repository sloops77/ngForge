angular.module('ngForge').provider('$forgeParse', function() {
  'use strict';

  return {
    $get: ['$injector', '$q', '$forge', '$forgeLogger', 'ngForgeUtils', function($injector, $q, $forge, $forgeLogger, ngForgeUtils) {
        var parseDummy;
        parseDummy = {
          dummyChannels: [''],
          badgeNumber: 0,
          getBadgeNumber: function(success) {
            success(this.badgeNumber);
          },
          setBadgeNumber: function(number, success) {
            this.badgeNumber = number;
            success();
          },
          installationInfo: function(success) {
            $forgeLogger.info('parseDummy info');
            return success({
              id: -696969
            });
          },
          registerForNotifications: function(s, e) {
            return s();
          },
          push: {
            subscribe: function(channel, s, e) {
              $forgeLogger.info("subscribing to " + channel);
              if (!ngForgeUtils.includes(this.dummyChannels, channel)) {
                this.dummyChannels.push(channel);
              }
              return typeof s === "function" ? s() : void 0;
            },
            unsubscribe: function(channel, s, e) {
              $forgeLogger.info("unsubscribing from " + channel);
              this.dummyChannels = ngForgeUtils.without(this.dummyChannels, channel);
              return typeof s === "function" ? s() : void 0;
            },
            subscribedChannels: function(s, e) {
              return typeof s === "function" ? s(this.dummyChannels) : void 0;
            }
          }
        };
        return ngForgeUtils.liftObject($forge.dummy ? parseDummy : forge.parse);
      }
    ]
  };
});
