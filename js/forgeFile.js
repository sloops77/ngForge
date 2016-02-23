angular.module('ngForge').provider('forgeFile', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, forgeUtils, logger) {
      if (forge.dummy) {
        logger.debug("using fileDummy");
      }
      if (forge.dummy) {
        return this.fileDummy($q, forge, forgeUtils);
      } else {
        return this.forgeFile(forge, forgeUtils);
      }
    },
    fileDummy: function($q, forge, forgeUtils) {
      forge.file = {
        isFile: function(file, success) {
          return success(!!(file != null ? file.uri : void 0));
        },
        getLocal: function(url, success) {
          return success({
            uri: url
          });
        },
        cacheURL: function(url, success, error) {
          return success({
            uri: url
          });
        },
        URL: function(file, success) {
          return success(file.uri);
        },
        remove: function(file, success) {
          return success();
        }
      };
      return forgeUtils.mapValues(forge.file, function(f) {
        return forgeUtils.lift(forge.file, f);
      });
    },
    forgeFile: function(forge, forgeUtils) {
      return forgeUtils.mapValues(forge.file, function(f) {
        return forgeUtils.lift(forge.file, f);
      });
    }
  };
});
