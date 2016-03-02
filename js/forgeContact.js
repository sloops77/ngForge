angular.module('ngForge').provider('$forgeContact', function() {
  'use strict';

  return {
    $get: [
      '$injector', '$q', 'forge', 'logger', 'ngForgeUtils', 'ngForgeConfig', function($injector, $q, forge, logger, ngForgeUtils, ngForgeConfig) {
        var contactDummy;
        contactDummy = {
          select: function(success, error) {
            logger.debug("select");
            return typeof success === "function" ? success() : void 0;
          },
          selectAll: function(fields, success, error) {
            if (ngForgeUtils.isFunction(fields)) {
              fields = ['id', 'displayName'];
              success = fields;
              error = success;
            }
            logger.debug("selectAll");
            return typeof success === "function" ? success(ngForgeConfig.sampleContacts.map(function(c) {
              return ngForgeUtils.pick(c, fields);
            })) : void 0;
          },
          selectById: function(id, success, error) {
            logger.debug("selectById");
            return typeof success === "function" ? success(ngForgeUtils.find(ngForgeConfig.sampleContacts, function(c) {
              return c.id === id;
            })) : void 0;
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? contactDummy : forge.contact);
      }
    ]
  };
});
