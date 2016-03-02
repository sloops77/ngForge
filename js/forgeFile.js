angular.module('ngForge').provider('$forgeFile', function() {
  'use strict';

  return {
    $get: ['$injector', '$q', 'forge', 'ngForgeUtils', function($injector, $q, forge, ngForgeUtils) {
        var fileDummy, forgeFile;
        fileDummy = {
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
        forgeFile = forge.dummy ? fileDummy : forge.file;
        return ngForgeUtils.liftObject(forgeFile);
      }
    ]
  };
});
