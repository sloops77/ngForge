angular.module('ngForge').provider('$forgePayments', function() {
  'use strict';

  return {
    $get: ['$forge', '$forgeLogger', 'ngForgeUtils', function($forge, $forgeLogger, ngForgeUtils) {
      var ngPayments = {
        purchaseProduct: function(productId, success, error) {
          var _this = this;
          setTimeout(
            function() {
              _this.transactionReceived.listeners.forEach(function(listener) {
                listener(
                  {productId: productId, purchaseState: 'PURCHASED'},
                  function() {
                    $forgeLogger.info("Purchase Confirmed")
                  }
                );
              });
            },
            5000
          );
          return success();
        },
        startSubscription: function(productId, success, error) {
          return success();
        },
        restoreTransactions: function(success, error) {
          return success();
        },
        consumePurchase: function(productId, success, error) {
          return success();
        },
        transactionReceived: {
          listeners: [],
          addListener: function(callback) {
            this.listeners.push(callback);
          }
        }
      };
      return ngForgeUtils.liftObject($forge.dummy ? ngPayments : forge.payments);
    }]
  };
});
