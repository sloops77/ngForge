angular.module('ngForge').provider('facebook', function() {
  'use strict';

  return {
    $get: function($injector, forge, logger) {
      if (forge.dummy) {
        logger.debug("using $facebook for comms");
      }
      if (forge.dummy) {
        return this.ngFacebook();
      } else {
        return this.forgeFacebook(forge);
      }
    },
    ngFacebook: function() {
      return {
        authorize: function(permissions, audience, success, error) {
          return success({
            access_token: "dfs",
            access_expires: "never",
            granted: true,
            denied: false
          });
        },
        hasAuthorized: function(permissions, audience, success, error) {
          return success({
            access_token: "dfs",
            access_expires: "never",
            granted: false,
            denied: false
          });
        },
        logout: function(success, error) {
          return success();
        },
        api: function(path, method, params, success, error) {
          return success(true);
        },
        ui: function(params, success, error) {
          return success(true);
        },
        installed: function(success, error) {
          return success(true);
        },
        getKeyHash: function(success, error) {
          return success("5453425284625867");
        }
      };
    },
    forgeFacebook: function(forge) {
      return forge.facebook;
    }
  };
});
