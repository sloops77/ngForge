angular.module('ngForge').provider('$forgeIonicKeyboard', function() {
  'use strict';

  return {
    $get: ['$injector', '$q', '$forge', '$forgeLogger', 'ngForgeUtils', function($injector, $q, $forge, $forgeLogger, ngForgeUtils) {
        var ionicKeyboardDummy;
        ionicKeyboardDummy = {
          disableScroll: function(val, success) {
            $forgeLogger.info("$forgeIonicKeyboard.disableScroll(" + val + ")");
            return typeof success === "function" ? success() : void 0;
          },
          hideKeyboardAccessoryBar: function(val, success) {
            $forgeLogger.info("$forgeIonicKeyboard.hideKeyboardAccessoryBar(" + val + ")");
            return typeof success === "function" ? success() : void 0;
          },
          isKeyboardVisible: function(success) {
            $forgeLogger.info('$forgeIonicKeyboard.isKeyboardVisible');
            return typeof success === "function" ? success() : void 0;
          },
          close: function(success) {
            $forgeLogger.info('$forgeIonicKeyboard.close');
            return typeof success === "function" ? success() : void 0;
          }
        };
        return ngForgeUtils.liftObject($forge.dummy ? ionicKeyboardDummy : forge.ionic_keyboard);
      }
    ]
  };
});
