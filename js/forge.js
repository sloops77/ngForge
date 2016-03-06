angular.module('ngForge', []);

angular.module('ngForge').provider('$forge', function() {
  return {
    testConnectionUrl: 'ping',
    $get              : ['$http', '$interval', '$window', '$forgeLogger', function($http, $interval, $window, $forgeLogger) {
      var forgeProvider = this;
      var dummyForge = {
        dummy         : true,
        is            : {
          web       : function () {
            return true;
          },
          mobile    : function () {
            return false;
          },
          android   : function () {
            return false;
          },
          ios       : function () {
            return false;
          },
          orientation: {
            portrait: function() {
              return true;
            },
            landscape: function() {
              return false;
            }
          },
          connection: {
            _connected: false,
            connected : function () {
              return this._connected;
            },
            wifi      : function () {
              return this._connected;
            }
          }
        },
        event         : {
          menuPressed          : {
            addListener   : function (callback, error) {
              return console.log("menu pressed event registration");
            }
          },
          backPressed          : {
            addListener   : function (callback, error) {
              return console.log("back pressed event registration");
            },
            preventDefault: function (callback, error) {
              return console.log('default back handling disabled');
            }
          },
          orientationChange : {
            addListener   : function (callback, error) {
              return console.log("orientation change event registration");
            }
          },
          connectionStateChange: {
            listeners  : [],
            addListener: function (callback, error) {
              this.listeners.push(callback);
              return console.log("connectionStateChange event registration");
            }
          },
          messagePushed        : {
            addListener: function (callback, error) {
              return console.log("messagePushed event registration");
            }
          },
          appPaused            : {
            addListener: function (callback, error) {
              return console.log("appPaused event registration");
            }
          },
          appResumed           : {
            addListener: function (callback, error) {
              return console.log("appResumed event registration");
            }
          },
          statusBarTapped           : {
            addListener: function (callback, error) {
              return console.log("statusBarTapped event registration");
            }
          }
        },
        tools: {
          UUID: function() {
            function s4() {
              return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
          },
          getURL: function(name, success, error) {
            success(name);
          }
        },
        testConnection: function () {
          var triggerListeners;
          triggerListeners = (function (_this) {
            return function (connectionState) {
              _this.is.connection._connected = connectionState;
              return _this.event.connectionStateChange.listeners.forEach(function (l) {
                return l();
              });
            };
          })(this);
          return $http.get(forgeProvider.testConnectionUrl).then((function (_this) {
            return function () {
              if (!_this.is.connection._connected) {
                return triggerListeners(true);
              }
            };
          })(this))["catch"]((function (_this) {
            return function () {
              if (_this.is.connection._connected) {
                return triggerListeners(false);
              }
            };
          })(this));
        }
      };
      if ($window.forge) {
        $forgeLogger.info("ngForge.$forge: using trigger.io");
        return $window.forge;
      } else {
        $forgeLogger.info("ngForge.$forge: using dummy");
        dummyForge.testConnection();
        $interval(function () {
          return dummyForge.testConnection();
        }, 5000);
        return dummyForge;
      }
    }]
  }
});
