/*!
 * Copyright 2015 Thinking Bytes Ltd.
 *
 * ngForge, v0.2.0
 * Angular wrappers for Trigger.io (forge) modules.
 * http://trigger.io/
 * http://angularjs.org/
 *
 * By @arolave <3
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */

(function() {
angular.module('ngForge', []);

angular.module('ngForge').factory('forge', ['$http', '$interval', '$window', 'logger', 'ngForgeConfig', function($http, $interval, $window, logger, ngForgeConfig) {
  var dummyForge = {
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
          return void 0;
        }
      },
      appPaused: {
        addListener: function(callback, error) {
          return void 0;
        }
      },
      appResumed: {
        addListener: function(callback, error) {
          return void 0;
        }
      },
      backPressed: {
        addListener: function(callback, error) {
          return void 0;
        },
        preventDefault: function(callback, error) {
          return void 0;
        }
      },
      connectionStateChange: {
        listeners: [],
        addListener: function(callback, error) {
          this.listeners.push(callback);
          return void 0;
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
      return $http.get(ngForgeConfig.testConnectionUrl).then((function(_this) {
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
    logger.info("ngForge.$forge: using trigger.io");
    return $window.forge;
  } else {
    logger.info("ngForge.$forge: using dummy");
    dummyForge.testConnection();
    $interval(function() {
      return dummyForge.testConnection();
    }, 5000);
    return dummyForge;
  }
}
]);

angular.module('ngForge').provider('$forgeContact', function() {
  'use strict';

  return {
    $get: [
      '$injector', '$q', 'forge', 'logger', 'ngForgeUtils', 'ngForgeConfig', function($injector, $q, forge, logger, ngForgeUtils, ngForgeConfig) {
        var contactDummy;
        contactDummy = {
          select: function(success, error) {
            logger.debug("select");
            return typeof success === "function" ? success() : void 0;
          },
          selectAll: function(fields, success, error) {
            if (ngForgeUtils.isFunction(fields)) {
              fields = ['id', 'displayName'];
              success = fields;
              error = success;
            }
            logger.debug("selectAll");
            return typeof success === "function" ? success(ngForgeConfig.sampleContacts.map(function(c) {
              return ngForgeUtils.pick(c, fields);
            })) : void 0;
          },
          selectById: function(id, success, error) {
            logger.debug("selectById");
            return typeof success === "function" ? success(ngForgeUtils.find(ngForgeConfig.sampleContacts, function(c) {
              return c.id === id;
            })) : void 0;
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? contactDummy : forge.contact);
      }
    ]
  };
});

angular.module('ngForge').provider('$forgeFacebook', function() {
  'use strict';

  return {
    $get: ['$injector', 'forge', 'logger', 'ngForgeConfig', 'ngForgeUtils', function($injector, forge, logger, ngForgeConfig, ngForgeUtils) {
        var ngFacebook;
        ngFacebook = {
          authorize: function(permissions, audience, success, error) {
            return success({
              access_token: 'dfs',
              access_expires: 'never',
              granted: true,
              denied: false
            });
          },
          hasAuthorized: function(permissions, audience, success, error) {
            return success({
              access_token: 'dfs',
              access_expires: 'never',
              granted: false,
              denied: false
            });
          },
          logout: function(success, error) {
            return success();
          },
          api: function(path, method, params, success, error) {
            return success(true);
          },
          ui: function(params, success, error) {
            return success(true);
          },
          installed: function(success, error) {
            return success(true);
          },
          getKeyHash: function(success, error) {
            return success(ngForgeConfig.facebookKeyHash);
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? ngFacebook : forge.facebook);
      }
    ]
  };
});

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

angular.module('ngForge').provider('$forgeHttp', ['$httpProvider', function($httpProvider) {
  'use strict';

  return {
    $get: [
      '$http', '$injector', '$q', '$rootScope', 'forge', 'logger', 'ngForgeUtils', function($http, $injector, $q, $rootScope, forge, logger, ngForgeUtils) {
        if (forge.dummy) {
          return this.ngHttp($http, logger);
        } else {
          return this.forgeHttp($http, $injector, $q, $rootScope, forge, ngForgeUtils, logger);
        }
      }
    ],
    httpProvider: $httpProvider,
    ngHttp: function($http, logger) {
      logger.debug("using $http for comms");
      return {
        request: function(config) {
          return $http(config);
        },
        get: function(url, config) {
          logger.log("ngget:" + url);
          return $http.get(url, config);
        },
        jsonp: function(url, config) {
          logger.log("ngjsonp:" + url);
          return $http.jsonp(url, config);
        },
        post: function(url, data, config) {
          logger.log("ngpost:" + url + ":" + data);
          return $http.post(url, data, config);
        },
        put: function(url, data, config) {
          logger.log("ngput:" + url + ":" + data);
          return $http.put(url, data, config);
        },
        "delete": function(url, config) {
          logger.log("ngdelete:" + url);
          return $http["delete"](url, config);
        }
      };
    },

    /*
     Supports the folowing fields $http:
     method: --> type
     url:
     params: --> appended to url
     data: content in json format only
     headers:  functional headers are not supported
     cache: boolean or cacheFactory instance
     timeout: milliseconds only (not promise)
     responseType  --> dataType
     interceptors


     Unsupported
     xsrfHeaderName
     xsrfCookieName
     transformRequest
     transformResponse
     withCredentials flag

     $httpProvider.defaults.headers.* configuration
     */
    forgeHttp: function($http, $injector, $q, $rootScope, forge, ngForgeUtils, logger) {
      var reversedInterceptors;
      logger.debug("using forge for comms");
      reversedInterceptors = [];
      angular.forEach(this.httpProvider.interceptors, function(interceptorFactory) {
        return reversedInterceptors.unshift(angular.isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
      });
      return {
        request: function(config) {
          return this._basicRequest(config.method, config.url, config);
        },
        get: function(url, config) {
          return this._getRequest(url, config);
        },
        post: function(url, data, config) {
          return this._basicRequest('post', url, config, data);
        },
        put: function(url, data, config) {
          return this._basicRequest('put', url, config, data);
        },
        patch: function(url, data, config) {
          return this._basicRequest('patch', url, config, data);
        },
        "delete": function(url, config) {
          return this._basicRequest('delete', url, config);
        },
        jsonp: function(url, config) {
          return this._basicRequest('jsonp', url, config);
        },
        _getRequest: function(url, config) {
          var cache, cachedResp, deferred, handleResponse, isSuccess, promise, resolvePromise, resolvePromiseWithResult;
          logger.info("_getRequest(" + url + ", " + (JSON.stringify(config)) + ")");
          deferred = $q.defer();
          promise = deferred.promise;
          if (ngForgeUtils.isObject(config != null ? config.cache : void 0)) {
            cache = config != null ? config.cache : void 0;
          }
          isSuccess = function(status) {
            return 200 <= status && status < 300;
          };
          resolvePromise = function(data, status, headers, statusText) {
            status = Math.max(status, 0);
            return (isSuccess(status) ? deferred.resolve : deferred.reject)({
              data: data,
              status: status,
              headers: headers,
              config: config,
              statusText: statusText
            });
          };
          resolvePromiseWithResult = function(result) {
            return resolvePromise(result.data, result.status, ngForgeUtils.safeClone(result.headers), result.statusText);
          };
          if (cache) {
            cachedResp = cache.get(url);
            if (cachedResp != null) {
              if (ngForgeUtils.isFunction(cachedResp.then)) {
                cachedResp.then(resolvePromiseWithResult, resolvePromiseWithResult);
              } else {
                if (Array.isArray(cachedResp)) {
                  resolvePromise(cachedResp[1], cachedResp[0], ngForgeUtils.safeClone(cachedResp[2]), cachedResp[3]);
                } else {
                  resolvePromise(cachedResp, 200, {}, 'OK');
                }
              }
              return promise;
            } else {
              cache.put(url, promise);
            }
          }
          handleResponse = function(response) {
            if (cache) {
              if (isSuccess(response.status)) {
                cache.put(url, [response.status, response.data, response.headers, response.statusText]);
              } else {
                cache.remove(url);
              }
            }
            return resolvePromiseWithResult(response);
          };
          this._basicRequest('get', url, config).then(handleResponse, handleResponse);
          return promise;
        },
        _forgeRequester: function(forgeOptions) {
          var deferred;
          logger.info("_forgeRequester");
          deferred = $q.defer();
          forgeOptions.success = function(data, headers) {
            logger.debug("ngForge.$forgeHttp.success: " + (JSON.stringify(data)));
            deferred.resolve({
              status: 200,
              data: data,
              headers: headers,
              config: forgeOptions
            });
            if (!$rootScope.$$phase) {
              return $rootScope.$apply();
            }
          };
          forgeOptions.error = function(error) {
            var data, status;
            logger.debug("error " + (JSON.stringify(error)));
            logger.error(error.statusCode + " " + error.content);
            status = 400;
            try {
              status = parseInt(error.statusCode);
            } catch (_error) {}
            data = error.content;
            try {
              data = JSON.parse(error.content);
            } catch (_error) {}
            deferred.reject({
              status: status,
              data: data,
              headers: {}
            });
            if (!$rootScope.$$phase) {
              return $rootScope.$apply();
            }
          };
          forge.request.ajax(forgeOptions);
          return deferred.promise;
        },
        _basicRequest: function(method, url, config, data) {
          var convertRequest, ngHttpConfig, options;
          convertRequest = function(cfg, options) {
            var extcfg, requestcfg;
            extcfg = angular.extend(options || {}, {
              contentType: 'application/json; charset=utf-8',
              accepts: ['application/json'],
              type: cfg.method.toUpperCase()
            });
            if (cfg.file) {
              extcfg.files = [cfg.file];
            } else {
              extcfg.dataType = cfg.responseType || 'json';
            }
            requestcfg = angular.extend(cfg || {}, extcfg);
            delete requestcfg.file;
            return requestcfg;
          };
          ngHttpConfig = angular.extend(config || {}, {
            method: method,
            url: url
          });
          if (method === 'jsonp') {
            return $http.jsonp(url, ngHttpConfig);
          } else {
            options = data ? {
              data: JSON.stringify(data)
            } : config && config.params ? {
              data: config.params
            } : void 0;
            return this._doRequest(convertRequest(ngHttpConfig, options));
          }
        },
        _doRequest: function(config) {
          var chain, promise, rejectFn, thenFn;
          logger.log("forge" + (config.method.toLowerCase()) + ":" + config.url + ":" + ((config != null ? config.data : void 0) ? JSON.stringify(config.data) : void 0));
          promise = $q.when(forgeOptions);
          chain = [this._forgeRequester, void 0];
          angular.forEach(reversedInterceptors, function(interceptor) {
            if (interceptor.request || interceptor.requestError) {
              chain.unshift(interceptor.request, interceptor.requestError);
            }
            if (interceptor.response || interceptor.responseError) {
              return chain.push(interceptor.response, interceptor.responseError);
            }
          });
          while (chain.length) {
            thenFn = chain.shift();
            rejectFn = chain.shift();
            promise = promise.then(thenFn, rejectFn);
          }
          promise.success = function(fn) {
            promise.then(function(response) {
              return fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          promise.error = function(fn) {
            promise["catch"](function(response) {
              var error, errorData;
              errorData = (function() {
                try {
                  return JSON.parse(response.data);
                } catch (_error) {
                  error = _error;
                  return response.data;
                }
              })();
              return fn(errorData, response.status, response.headers, config);
            });
            return promise;
          };
          return promise;
        }
      };
    }
  };
}]
);
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

angular.module('ngForge').factory('logger', ['ngForgeUtils', function(ngForgeUtils) {
  var error, group, groupEnd, groups, log, logger, message;
  if (!(window.forge && window.forge.is && window.forge.is.mobile())) {
    return console;
  }
  error = function(args) {
    var allErrors, f;
    args = Array.prototype.slice.call(args);
    allErrors = ngForgeUtils.filter(args, function(o) {
      return o && o instanceof Error;
    });
    if (allErrors && allErrors.length) {
      return f = allErrors[0];
    }
  };

  message = function(args) {
    return Array.prototype.slice.call(args).toString();
  };

  groups = [];

  group = function(name) {
    log("▾ " + name);
    return groups.push(name);
  };

  groupEnd = function() {
    return groups.pop();
  };

  log = function(message, error, method) {
    var i, j, padding, ref;
    if (method == null) {
      method = forge.logging.log;
    }
    padding = '';
    for (i = j = 0, ref = group.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      padding += '| ';
    }
    return forge.logging.log("" + padding + message, error);
  };

  return {
    log: function() {
      return log(message(arguments), error(arguments));
    },
    debug: function() {
      return log(message(arguments), error(arguments), forge.logging.debug);
    },
    info: function() {
      return log(message(arguments), error(arguments), forge.logging.info);
    },
    warn: function() {
      return log(message(arguments), error(arguments), forge.logging.warn);
    },
    error: function() {
      return log(message(arguments), error(arguments), forge.logging.error);
    },
    critical: function() {
      return log(message(arguments), error(arguments), forge.logging.critical);
    },
    group: group,
    groupCollapsed: group,
    groupEnd: groupEnd
  };
}]
);


angular.module('ngForge').provider('$forgeMedia', function() {
  'use strict';

  return {
    $get: ['$injector', '$q', 'forge', 'logger', 'ngForgeUtils', function($injector, $q, forge, logger, ngForgeUtils) {
        var mediaDummy;
        mediaDummy = {
          playerDummy: {
            play: function(success) {
              return typeof success === "function" ? success() : void 0;
            }
          },
          createAudioPlayer: function(file, success, error) {
            logger.info("create dummy player " + file);
            return typeof success === "function" ? success(this.playerDummy) : void 0;
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? mediaDummy : forge.media);
      }
    ]
  };
});

angular.module('ngForge').provider('$forgeParse', function() {
  'use strict';

  return {
    $get: ['$injector', '$q', 'forge', 'logger', 'ngForgeUtils', function($injector, $q, forge, logger, ngForgeUtils) {
        var parseDummy;
        parseDummy = {
          dummyChannels: [''],
          installationInfo: function(success) {
            logger.info('parseDummy info');
            return success({
              id: -696969
            });
          },
          registerForNotifications: function(s, e) {
            return s();
          },
          push: {
            subscribe: function(channel, s, e) {
              logger.info("subscribing to " + channel);
              if (!ngForgeUtils.includes(this.dummyChannels, channel)) {
                this.dummyChannels.push(channel);
              }
              return typeof s === "function" ? s() : void 0;
            },
            unsubscribe: function(channel, s, e) {
              logger.info("unsubscribing from " + channel);
              this.dummyChannels = ngForgeUtils.without(this.dummyChannels, channel);
              return typeof s === "function" ? s() : void 0;
            },
            subscribedChannels: function(s, e) {
              return typeof s === "function" ? s(this.dummyChannels) : void 0;
            }
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? parseDummy : forge.parse);
      }
    ]
  };
});

angular.module('ngForge').provider('$forgePlatform', function() {
  'use strinct';
  return {
    $get: [
      '$injector', '$q', 'forge', 'ngForgeUtils', function($injector, $q, forge, ngForgeUtils) {
        var forgePlatform, platformDummy;
        platformDummy = {
          getModel: function(success, error) {
            return success('X');
          },
          getVersion: function(success, error) {
            return success('1');
          },
          getAPILevel: function(success, error) {
            return success('1');
          },
          getManufacturer: function(success, error) {
            return success('X');
          }
        };
        forgePlatform = forge.dummy ? platformDummy : forge.platform;
        return ngForgeUtils.liftObject(forgePlatform);
      }
    ]
  };
});

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

angular.module('ngForge').provider('$forgeSegmentio', function() {
  'use strict';

  return {
    $get: [
      '$injector', '$q', 'forge', 'logger', 'ngForgeUtils', function($injector, $q, forge, logger, ngForgeUtils) {
        var forgeSegmentioDummy;
        forgeSegmentioDummy = {
          identify: function(userId, traits, success, error) {
            logger.debug("identify");
            return typeof success === "function" ? success() : void 0;
          },
          track: function(event, properties, success, error) {
            logger.debug("track");
            return typeof success === "function" ? success() : void 0;
          },
          screen: function(view, properties, success, error) {
            logger.debug("screen");
            return typeof success === "function" ? success() : void 0;
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? forgeSegmentioDummy : forge.segmentio);
      }
    ]
  };
});

angular.module('ngForge').provider('$forgeSms', function() {
  'use strict';

  return {
    $get: [
      '$injector', '$q', 'forge', 'logger', 'ngForgeUtils', function($injector, $q, forge, logger, ngForgeUtils) {
        var smsDummy;
        smsDummy = {
          send: function(params, success, error) {
            logger.debug("$forgeSms.send " + params.body + " to " + (JSON.stringify(params.to)));
            return typeof success === "function" ? success() : void 0;
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? smsDummy : forge.sms);
      }
    ]
  };
});

angular.module('ngForge').constant('ngForgeConfig', {
  testConnectionUrl: 'ping',
  facebookKeyHash: '5453425284625867',
  prefsKey: 'ngStorage-prefs',
  sampleContacts: [
    {
      "id": "14894",
      "displayName": "Gal Gadot",
      "name": {
        "formatted": "Gal Gadot",
        "familyName": "Gadot",
        "givenName": "Gal",
        "middleName": null,
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "",
      "phoneNumbers": [
        {
          "value": "+447574712444",
          "type": "mobile",
          "pref": false
        }
      ],
      "photos": [
        {
          "value": "data:image/jpg;base64,ABCDEF1234",
          "type": null,
          "pref": false
        }
      ]
    }, {
      "id": "148900",
      "displayName": "Tom",
      "name": {
        "formatted": "Tom",
        "familyName": "",
        "givenName": "Tom",
        "middleName": null,
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "",
      "phoneNumbers": [
        {
          "value": "+44 751-5097756+13",
          "type": "mobile",
          "pref": false
        }
      ],
      "photos": [
        {
          "value": "data:image/jpg;base64,ABCDEF1234",
          "type": null,
          "pref": false
        }
      ]
    }, {
      "id": "14894",
      "displayName": "Brigid",
      "name": {
        "formatted": "Brigid",
        "familyName": "",
        "givenName": "Brigid",
        "middleName": null,
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "",
      "phoneNumbers": [
        {
          "value": "+33 7817471244",
          "type": "mobile",
          "pref": false
        }
      ],
      "photos": [
        {
          "value": "data:image/jpg;base64,ABCDEF1234",
          "type": null,
          "pref": false
        }
      ]
    }, {
      "id": "14895",
      "displayName": "Eddie Redmayne",
      "name": {
        "formatted": "Eddie Redmayne",
        "familyName": "Fenech",
        "givenName": "Eddie",
        "middleName": null,
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "",
      "phoneNumbers": [
        {
          "value": "+447432111412",
          "type": "mobile",
          "pref": false
        }
      ],
      "photos": [
        {
          "value": "data:image/jpg;base64,ABCDEF1234",
          "type": null,
          "pref": false
        }
      ]
    }, {
      "id": "122",
      "displayName": "Arow",
      "name": {
        "formatted": "Arow",
        "familyName": "Arow"
      },
      "nickname": "",
      "phoneNumbers": [
        {
          "value": "+972 963587331",
          "type": "mobile",
          "pref": false
        }
      ]
    }, {
      "id": "299",
      "displayName": "Bad Phone",
      "name": {
        "formatted": "Bad Phone",
        "familyName": "BPhone"
      },
      "nickname": "",
      "phoneNumbers": [
        {
          "value": "+97288898",
          "type": "mobile",
          "pref": false
        }
      ]
    }, {
      "id": "1",
      "displayName": "Girt Wenders",
      "name": {
        "formatted": "Girt Wenders",
        "familyName": "Wenders",
        "givenName": "Girt",
        "middleName": null,
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "",
      "phoneNumbers": [
        {
          "value": "+972 521123241",
          "type": "mobile",
          "pref": false
        }
      ]
    }, {
      "id": "690",
      "displayName": "Dodgy Bro",
      "name": {
        "formatted": "Dodgy Bro",
        "familyName": "Bro",
        "givenName": "Dodgy",
        "middleName": null,
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "Doge",
      "phoneNumbers": [
        {
          "value": "+44 7967929796",
          "type": "mobile",
          "pref": false
        }
      ]
    }, {
      "id": "691",
      "displayName": "Toby Bro",
      "name": {
        "formatted": "Toby Bro",
        "familyName": "Bro",
        "givenName": "Toby",
        "middleName": null,
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "Tobe",
      "phoneNumbers": [
        {
          "value": "+44-783-241324",
          "type": "work",
          "pref": false
        }
      ]
    }, {
      "id": "2",
      "displayName": "Mr Bodie Carstairs",
      "name": {
        "formatted": "Bodie Carstairs",
        "familyName": "Carstairs",
        "givenName": "Bodie",
        "middleName": null,
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "Bo",
      "phoneNumbers": [
        {
          "value": "+447321123324",
          "type": "mobile",
          "pref": false
        }
      ],
      "photos": [
        {
          "value": "data:image/jpg;base64,ABCDEF1234",
          "type": null,
          "pref": false
        }
      ]
    }, {
      "id": "3",
      "displayName": "Lucy Cleaner",
      "name": {
        "formatted": "Lucy Cleaner",
        "familyName": "Cleaner",
        "givenName": "Lucy",
        "middleName": "middle",
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "",
      "phoneNumbers": [
        {
          "value": "+447321132131",
          "type": "mobile",
          "pref": false
        }
      ],
      "photos": [
        {
          "value": "data:image/jpg;base64,ABCDEF1234",
          "type": null,
          "pref": false
        }
      ]
    }, {
      "id": "33",
      "displayName": "Ches",
      "name": {
        "formatted": "Ches",
        "familyName": "",
        "givenName": "Ches",
        "middleName": "",
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "",
      "phoneNumbers": [
        {
          "value": "0543742342",
          "type": "mobile",
          "pref": false
        }
      ],
      "photos": [
        {
          "value": "data:image/jpg;base64,ABCDEF1234",
          "type": null,
          "pref": false
        }
      ]
    }, {
      "id": "4",
      "displayName": "Sarah",
      "name": {
        "formatted": "Sarah",
        "familyName": "",
        "givenName": "Sarah",
        "middleName": null,
        "honorificPrefix": "",
        "honorificSuffic": null
      },
      "nickname": "tush",
      "phoneNumbers": [
        {
          "value": "+972547434302",
          "type": "work",
          "pref": false
        }, {
          "value": "+335723131231",
          "type": "home",
          "pref": false
        }, {
          "value": "+447312311232",
          "type": "mobile",
          "pref": false
        }
      ],
      "photos": [
        {
          "value": "data:image/jpg;base64,ABCDEF1234",
          "type": null,
          "pref": false
        }
      ]
    }
  ]
});
angular.module('ngForge').factory('ngForgeUtils', ['$q', function($q) {
    'use strict';
    var slice = [].slice,
      hasProp = {}.hasOwnProperty;

    return {
      funcTag: '[object Function]',
      genTag: '[object GeneratorFunction]',
      filter: function(arr, fn) {
        var buff, i, len, value;
        if (!arr) {
          return void 0;
        }
        buff = [];
        for (i = 0, len = arr.length; i < len; i++) {
          value = arr[i];
          if (fn(value)) {
            buff.push(value);
          }
        }
        return buff;
      },
      find: function(arr, fn) {
        var i, len, value;
        if (!arr) {
          return void 0;
        }
        for (i = 0, len = arr.length; i < len; i++) {
          value = arr[i];
          if (fn(value)) {
            return value;
          }
        }
        return void 0;
      },
      includes: function(arr, target) {
        var i, len, value;
        if (!arr) {
          return void 0;
        }
        for (i = 0, len = arr.length; i < len; i++) {
          value = arr[i];
          if (value === target) {
            return true;
          }
        }
        return false;
      },
      isFunction: function(value) {
        var tag;
        tag = this.isObject(value) ? Object.prototype.toString.call(value) : '';
        return tag === this.funcTag || tag === this.genTag;
      },
      isObject: function(value) {
        var type;
        type = typeof value;
        return type === 'object' || type === 'function';
      },
      lift: function(_this, fn) {
        return function() {
          var allArgs, args, deferred, errorFn, successFn;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          deferred = $q.defer();
          successFn = function() {
            if (!!arguments && arguments.length === 1) {
              return deferred.resolve(arguments[0]);
            } else {
              return deferred.resolve(arguments);
            }
          };
          errorFn = function() {
            if (!!arguments && arguments.length === 1) {
              return deferred.reject(arguments[0]);
            } else {
              return deferred.reject(arguments);
            }
          };
          allArgs = args.concat([successFn, errorFn]);
          fn.apply(_this, allArgs);
          return deferred.promise;
        };
      },
      liftGlobalFn: function(fn) {
        return this.lift(null, fn);
      },
      liftObject: function(obj) {
        var buff, k, v;
        buff = {};
        if (!obj) {
          return buff;
        }
        for (k in obj) {
          if (!hasProp.call(obj, k)) continue;
          v = obj[k];
          v = obj[k];
          buff[k] = this.isFunction(v) ? buff[k] = this.lift(obj, v) : this.isObject(v) ? this.liftObject(v) : v;
        }
        return buff;
      },
      mapValues: function(obj, fn) {
        var buff, i, k, len, ref;
        buff = {};
        if (!obj) {
          return buff;
        }
        ref = Object.keys(obj);
        for (i = 0, len = ref.length; i < len; i++) {
          k = ref[i];
          buff[k] = fn(obj[k]);
        }
        return buff;
      },
      pick: function(obj, targetKeys) {
        var buff, i, k, len;
        if (!obj) {
          return obj;
        }
        buff = {};
        for (i = 0, len = targetKeys.length; i < len; i++) {
          k = targetKeys[i];
          buff[k] = obj[k];
        }
        return buff;
      },
      safeClone: function(value) {
        if (value) {
          return JSON.parse(JSON.stringify(value));
        }
      },
      without: function(arr, target) {
        var buff, i, len, value;
        if (!arr) {
          return arr;
        }
        buff = [];
        for (i = 0, len = arr.length; i < len; i++) {
          value = arr[i];
          if (value !== target) {
            buff.push(value);
          }
        }
        return buff;
      }
    };
  }
]);
})();