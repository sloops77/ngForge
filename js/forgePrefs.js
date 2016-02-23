angular.module('ngForge').provider('prefs', function() {
  'use strict';

  return {
    $get: function($injector, $localStorage, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using prefsDummy for playing images");
      }
      if (forge.dummy) {
        return this.prefsDummy($localStorage, logger);
      } else {
        return this.forgePrefs(forge);
      }
    },
    prefsDummy: function($localStorage, logger) {
      return {
        prefsObj: function() {
          return $localStorage.prefs != null ? $localStorage.prefs : $localStorage.prefs = {};
        },
        get: function(key, success, error) {
          var e;
          try {
            return typeof success === "function" ? success(this.prefsObj()[key]) : void 0;
          } catch (_error) {
            e = _error;
            logger.error(e.message);
            if (typeof error === "function") {
              error(e);
            }
          }
        },
        set: function(key, value, success, error) {
          var e;
          try {
            this.prefsObj()[key] = value;
            return typeof success === "function" ? success() : void 0;
          } catch (_error) {
            e = _error;
            logger.error(e.message);
            return typeof error === "function" ? error(e) : void 0;
          }
        },
        clear: function(key, success, error) {
          var e;
          try {
            delete this.prefsObj()[key];
            return typeof success === "function" ? success() : void 0;
          } catch (_error) {
            e = _error;
            logger.error(e.message);
            return typeof error === "function" ? error(e) : void 0;
          }
        },
        clearAll: function(success, error) {
          var e;
          try {
            delete $localStorage._prefs;
            return typeof success === "function" ? success() : void 0;
          } catch (_error) {
            e = _error;
            logger.error(e.message);
            return typeof error === "function" ? error(e) : void 0;
          }
        },
        keys: function(success, error) {
          var e, prefsObj;
          try {
            prefsObj = this.prefsObj();
            return success(prefsObj ? Object.keys(prefsObj) : void 0);
          } catch (_error) {
            e = _error;
            logger.error(e.message);
            return error(e);
          }
        }
      };
    },
    forgePrefs: function(forge) {
      return forge.prefs;
    }
  };
});
