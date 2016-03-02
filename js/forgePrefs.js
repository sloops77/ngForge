angular.module('ngForge').provider('$forgePrefs', function() {
  'use strict';

  return {
    $get: ['$injector', '$q', '$window', 'forge', 'logger', 'ngForgeConfig', 'ngForgeUtils', function($injector, $q, $window, forge, logger, ngForgeConfig, ngForgeUtils) {
        var getPrefsObj, prefsDummy, setPrefsObj;
        setPrefsObj = function(prefs) {
          return $window.localStorage.setItem(ngForgeConfig.prefsKey, JSON.stringify(prefs));
        };
        getPrefsObj = function() {
          var prefs;
          prefs = $window.localStorage.getItem(ngForgeConfig.prefsKey);
          if (prefs) {
            prefs = JSON.parse(prefs);
          }
          if (!prefs) {
            prefs = {};
            setPrefsObj(prefs);
          }
          return prefs;
        };
        prefsDummy = {
          get: function(key, success, error) {
            var e;
            try {
              return typeof success === "function" ? success(getPrefsObj()[key]) : void 0;
            } catch (_error) {
              e = _error;
              logger.error(e.message);
              if (typeof error === "function") {
                error(e);
              }
            }
          },
          set: function(key, value, success, error) {
            var e, prefs;
            try {
              prefs = getPrefsObj();
              prefs[key] = value;
              setPrefsObj(prefs);
              return typeof success === "function" ? success() : void 0;
            } catch (_error) {
              e = _error;
              logger.error(e.message);
              return typeof error === "function" ? error(e) : void 0;
            }
          },
          clear: function(key, success, error) {
            var e, prefs;
            try {
              prefs = getPrefsObj();
              delete prefs[key];
              setPrefsObj(prefs);
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
              setPrefsObj({});
              return typeof success === "function" ? success() : void 0;
            } catch (_error) {
              e = _error;
              logger.error(e.message);
              return typeof error === "function" ? error(e) : void 0;
            }
          },
          keys: function(success, error) {
            var e, prefs;
            try {
              prefs = getPrefsObj();
              return success(Object.keys(prefs));
            } catch (_error) {
              e = _error;
              logger.error(e.message);
              return error(e);
            }
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? prefsDummy : forge.prefs);
      }
    ]
  };
});
