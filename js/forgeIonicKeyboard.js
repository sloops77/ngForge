angular.module('ngForge').provider('ionic_keyboard', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using ionicKeyboardDummy for keyboardcontrol");
      }
      if (forge.dummy) {
        return this.ionicKeyboardDummy(logger);
      } else {
        return this.forgeIonicKeyboard(forge);
      }
    },
    ionicKeyboardDummy: function(logger) {
      return {
        disableScroll: function(val, f) {
          logger.info("ionic_keyboard.disableScroll(" + val + ")");
          return typeof f === "function" ? f() : void 0;
        },
        hideKeyboardAccessoryBar: function(val, f) {
          logger.info("ionic_keyboard.hideKeyboardAccessoryBar(" + val + ")");
          return typeof f === "function" ? f() : void 0;
        },
        isKeyboardVisible: function(f) {
          logger.info('ionic_keyboard.isKeyboardVisible');
          return typeof f === "function" ? f() : void 0;
        },
        close: function(f) {
          logger.info('ionic_keyboard.close');
          return typeof f === "function" ? f() : void 0;
        }
      };
    },
    forgeIonicKeyboard: function(forge) {
      return forge.ionic_keyboard;
    }
  };
});
