angular.module('ngForge').provider('$forgeIonicKeyboard', function() {
  'use strict';

  return {
    $get: ['$injector', '$q', 'forge', 'logger', 'ngForgeUtils', function($injector, $q, forge, logger, ngForgeUtils) {
        var ionicKeyboardDummy;
        ionicKeyboardDummy = {
          disableScroll: function(val, success) {
            logger.info("$forgeIonicKeyboard.disableScroll(" + val + ")");
            return typeof success === "function" ? success() : void 0;
          },
          hideKeyboardAccessoryBar: function(val, success) {
            logger.info("$forgeIonicKeyboard.hideKeyboardAccessoryBar(" + val + ")");
            return typeof success === "function" ? success() : void 0;
          },
          isKeyboardVisible: function(success) {
            logger.info('$forgeIonicKeyboard.isKeyboardVisible');
            return typeof success === "function" ? success() : void 0;
          },
          close: function(success) {
            logger.info('$forgeIonicKeyboard.close');
            return typeof success === "function" ? success() : void 0;
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? ionicKeyboardDummy : forge.ionic_keyboard);
      }
    ]
  };
});
