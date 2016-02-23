angular.module('ngForge', []);

angular.module('ngForge').constant('forgeConfig', {
  testConnectionUrl: 'ping'
});

angular.module('ngForge').factory('forge', function($window, $interval, $http, forgeConfig) {
  'use strict';
  var dummyForge;
  dummyForge = {
    dummy: true,
    is: {
      web: function() {
        return true;
      },
      mobile: function() {
        return false;
      },
      android: function() {
        return false;
      },
      ios: function() {
        return false;
      },
      connection: {
        _connected: false,
        connected: function() {
          return this._connected;
        },
        wifi: function() {
          return this._connected;
        }
      }
    },
    event: {
      messagePushed: {
        addListener: function(callback, error) {
          return console.log("messagePushed event registration");
        }
      },
      appPaused: {
        addListener: function(callback, error) {
          return console.log("appPaused event registration");
        }
      },
      appResumed: {
        addListener: function(callback, error) {
          return console.log("appResumed event registration");
        }
      },
      backPressed: {
        addListener: function(callback, error) {
          return console.log("back pressed");
        },
        preventDefault: function(callback, error) {
          return console.log('default back handling disabled');
        }
      },
      connectionStateChange: {
        listeners: [],
        addListener: function(callback, error) {
          this.listeners.push(callback);
          return console.log("connectionStateChange");
        }
      }
    },
    testConnection: function() {
      var triggerListeners;
      triggerListeners = (function(_this) {
        return function(connectionState) {
          _this.is.connection._connected = connectionState;
          return _this.event.connectionStateChange.listeners.forEach(function(l) {
            return l();
          });
        };
      })(this);
      return $http.get(forgeConfig.testConnectionUrl).then((function(_this) {
        return function() {
          if (!_this.is.connection._connected) {
            return triggerListeners(true);
          }
        };
        })(this))["catch"]((function(_this) {
        return function() {
          if (_this.is.connection._connected) {
            return triggerListeners(false);
          }
        };
      })(this));
    }
  };
  if ($window.forge) {
    return $window.forge;
  } else {
    dummyForge.testConnection();
    $interval(function() {
      return dummyForge.testConnection();
    }, 5000);
    return dummyForge;
  }
});
