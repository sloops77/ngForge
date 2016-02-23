/*!
 * Copyright 2015 Thinking Bytes Ltd.
 *
 * ngForge, v0.1.0
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

angular.module('ngForge').provider('contact', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, forgeUtils, logger) {
      if (forge.dummy) {
        logger.debug("using contactDummy for playing images");
      }
      if (forge.dummy) {
        return this.contactDummy(forgeUtils, logger);
      } else {
        return this.forgeContact(forge);
      }
    },
    contactDummy: function(forgeUtils, logger) {
      return {
        _examples: [
          {
            "id": "14894",
            "displayName": "Gal Goltzman",
            "name": {
              "formatted": "Gal Goltzman",
              "familyName": "Goltzman",
              "givenName": "Gal",
              "middleName": null,
              "honorificPrefix": "",
              "honorificSuffic": null
            },
            "nickname": "",
            "phoneNumbers": [
              {
                "value": "+972574712441",
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
                "value": "+972 51-5097756+13",
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
                "value": "+447817471244",
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
            "displayName": "Eddie Fenech",
            "name": {
              "formatted": "Eddie Fenech",
              "familyName": "Fenech",
              "givenName": "Eddie",
              "middleName": null,
              "honorificPrefix": "",
              "honorificSuffic": null
            },
            "nickname": "",
            "phoneNumbers": [
              {
                "value": "+447432112312",
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
            "displayName": "Aro",
            "name": {
              "formatted": "Aro",
              "familyName": "Aro"
            },
            "nickname": "",
            "phoneNumbers": [
              {
                "value": "+9727963587331",
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
            "displayName": "Guy kedara",
            "name": {
              "formatted": "Guy kedara",
              "familyName": "kedara",
              "givenName": "Guy",
              "middleName": null,
              "honorificPrefix": "",
              "honorificSuffic": null
            },
            "nickname": "",
            "phoneNumbers": [
              {
                "value": "+44732112324",
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
                "value": "+972 547929796",
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
                "value": "+972-4324-1324",
                "type": "work",
                "pref": false
              }
            ]
          }, {
            "id": "2",
            "displayName": "Mr Joe Carstairs",
            "name": {
              "formatted": "Joe Carstairs",
              "familyName": "Carstairs",
              "givenName": "Joe",
              "middleName": null,
              "honorificPrefix": "",
              "honorificSuffic": null
            },
            "nickname": "Joey",
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
            "displayName": "sarit",
            "name": {
              "formatted": "sarit",
              "familyName": "",
              "givenName": "sarit",
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
                "value": "+972723131231",
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
        ],
        select: function(success, error) {
          logger.debug("select");
          return typeof success === "function" ? success() : void 0;
        },
        selectAll: function(fields, success, error) {
          if (forgeUtils.isFunction(fields)) {
            fields = ['id', 'displayName'];
            success = fields;
            error = success;
          }
          logger.debug("selectAll");
          return typeof success === "function" ? success(this._examples.map(function(c) {
            return forgeUtils.pick(c, fields);
          })) : void 0;
        },
        selectById: function(id, success, error) {
          logger.debug("selectById");
          return typeof success === "function" ? success(forgeUtils.find(this._examples, function(c) {
            return c.id === id;
          })) : void 0;
        }
      };
    },
    forgeContact: function(forge) {
      return forge.contact;
    }
  };
});

angular.module('ngForge').provider('facebook', function() {
  'use strict';

  return {
    $get: function($injector, forge, logger) {
      if (forge.dummy) {
        logger.debug("using $facebook for comms");
      }
      if (forge.dummy) {
        return this.ngFacebook();
      } else {
        return this.forgeFacebook(forge);
      }
    },
    ngFacebook: function() {
      return {
        authorize: function(permissions, audience, success, error) {
          return success({
            access_token: "dfs",
            access_expires: "never",
            granted: true,
            denied: false
          });
        },
        hasAuthorized: function(permissions, audience, success, error) {
          return success({
            access_token: "dfs",
            access_expires: "never",
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
          return success("5453425284625867");
        }
      };
    },
    forgeFacebook: function(forge) {
      return forge.facebook;
    }
  };
});

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

angular.module('ngForge').provider('httpProxy', function($httpProvider) {
  'use strict';

  return {
    $get: function($http, $injector, $q, $rootScope, $upload, forge, forgeUtils, logger) {
      if (forge.dummy) {
        logger.debug("using $http for comms");
      }
      if (forge.dummy) {
        return this.ngHttp($http, $upload, logger);
      } else {
        return this.forgeHttp($http, $injector, $q, $rootScope, $upload, forge, forgeUtils, logger);
      }
    },
    httpProvider: $httpProvider,
    ngHttp: function($http, $upload, logger) {
      return {
        request: function(config) {
          switch (config.swMethod) {
            case 'upload':
              return this.upload(config.url, config);
            default:
              return $http(config);
          }
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
        },
        upload: function(url, config) {
          logger.log("ngpupload:" + url);
          config.swMethod = 'upload';
          config.url = url;
          return $upload.upload(config);
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
    forgeHttp: function($http, $injector, $q, $rootScope, $upload, forge, forgeUtils, logger) {
      var reversedInterceptors;
      logger.debug("using forge for comms");
      reversedInterceptors = [];
      angular.forEach(this.httpProvider.interceptors, function(interceptorFactory) {
        return reversedInterceptors.unshift(angular.isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
      });
      return {
        _convertRequest: function(config) {
          config.accepts = ['application/json'];
          if (config.file == null) {
            config.dataType = config.responseType || 'json';
          }
          config.type = config.method.toUpperCase();
          if (config.file != null) {
            config.files = [config.file];
            delete config.file;
          }
          return config;
        },
        request: function(config) {
          switch (config.swMethod) {
            case 'upload':
              return this.upload(config.url, config);
            case 'jsonp':
              return $http(config);
            default:
              return this._doRequest(config.method, config.url, config);
          }
        },
        get: function(url, config) {
          return this._getRequest(url, config);
        },
        post: function(url, data, config) {
          return this._dataRequest('POST', url, data, config);
        },
        put: function(url, data, config) {
          return this._dataRequest('PUT', url, data, config);
        },
        patch: function(url, data, config) {
          return this._dataRequest('PATCH', url, data, config);
        },
        "delete": function(url, config) {
          return this._basicRequest('DELETE', url, config);
        },
        jsonp: function(url, config) {
          config.swMethod = 'jsonp';
          return $http.jsonp(url, config);
        },
        upload: function(url, config) {
          config.swMethod = 'upload';
          logger.log("upload: " + url);
          config.url = url;
          return $upload.upload(config);
        },
        _dataRequest: function(method, url, data, config) {
          return this._doRequest(method, url, angular.extend(config || {}, {
            data: JSON.stringify(data)
          }));
        },
        _getRequest: function(url, config) {
          var cache, cachedResp, deferred, handleResponse, isSuccess, promise, resolvePromise, resolvePromiseWithResult;
          deferred = $q.defer();
          promise = deferred.promise;
          if (forgeUtils.isObject(config != null ? config.cache : void 0)) {
            cache = config != null ? config.cache : void 0;
          }
          isSuccess = function(status) {
            return status >= 200 && status < 300;
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
            return resolvePromise(result.data, result.status, forgeUtils.safeClone(result.headers), result.statusText);
          };
          if (cache) {
            cachedResp = cache.get(url);
            if (cachedResp != null) {
              if (forgeUtils.isFunction(cachedResp.then)) {
                cachedResp.then(resolvePromiseWithResult, resolvePromiseWithResult);
              } else {
                if (Array.isArray(cachedResp)) {
                  resolvePromise(cachedResp[1], cachedResp[0], forgeUtils.safeClone(cachedResp[2]), cachedResp[3]);
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
          this._basicRequest('GET', url, config).then(handleResponse, handleResponse);
          return promise;
        },
        _basicRequest: function(method, url, config) {
          if (config && config.params) {
            return this._doRequest(method, url, angular.extend(config || {}, {
              data: config.params
            }));
          } else {
            return this._doRequest(method, url, config);
          }
        },
        _forgeRequester: function(forgeOptions) {
          var deferred;
          logger.debug("_forgeRequester");
          deferred = $q.defer();
          forgeOptions.success = function(data, headers) {
            logger.debug("success");
            logger.debug(data);
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
            } catch (_error) {
              //do nothing
            }
            data = error.content;
            try {
              data = JSON.parse(error.content);
            } catch (_error) {
              //do nothing
            }
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
        _doRequest: function(method, url, config) {
          var chain, forgeOptions, promise, rejectFn, thenFn;
          logger.log("forge" + (method.toLowerCase()) + ":" + url + ":" + ((config != null ? config.data : void 0) ? JSON.stringify(config.data) : void 0));
          forgeOptions = this._convertRequest(angular.extend(config || {}, {
            method: method,
            url: url,
            contentType: 'application/json; charset=utf-8'
          }));
          logger.debug(JSON.stringify(forgeOptions));
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
              var errorData;
              errorData = (function() {
                try {
                  return JSON.parse(response.data);
                } catch (_error) {
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
});

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

angular.module('ngForge').factory('logger', function(forgeUtils) {
  'use strict';

  var error, group, groupEnd, groups, log, logger, message;
  if (!(window.forge && window.forge.is && window.forge.is.mobile())) {
    return console;
  }
  error = function(args) {
    var allErrors;
    args = Array.prototype.slice.call(args);
    allErrors = forgeUtils.filter(args, function(o) {
      return o && o instanceof Error;
    });
    if (allErrors && allErrors.length) {
      return allErrors[0];
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
    if (method == null) {
      method = forge.logging.log;
    }

    var padding = "";
    for (var i = 0; i < group.length; ++i) {
      padding += "| ";
    }
    return method(padding + message, error);
  };
  logger = {
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
  return logger;
});

angular.module('ngForge').provider('media', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using mediaDummy for playing images");
      }
      if (forge.dummy) {
        return this.mediaDummy(logger);
      } else {
        return this.forgeMedia(forge);
      }
    },
    mediaDummy: function(logger) {
      return {
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
    },
    forgeMedia: function(forge) {
      return forge.media;
    }
  };
});

angular.module('ngForge').provider('parse', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, forgeUtils, logger) {
      if (forge.dummy) {
        logger.debug("using parseDummy for notifications");
      }
      if (forge.dummy) {
        return this.parseDummy(forgeUtils, logger);
      } else {
        return this.forgeParse(forge);
      }
    },
    parseDummy: function(forgeUtils, logger) {
      var dummyChannels;
      dummyChannels = [''];
      return {
        installationInfo: function(f) {
          logger.info('parseDummy info');
          return f({
            id: -696969
          });
        },
        registerForNotifications: function(success, error) {
          return success();
        },
        push: {
          subscribe: function(channel, success, error) {
            logger.info("subscribing to " + channel);
            if (!forgeUtils.includes(dummyChannels, channel)) {
              dummyChannels.push(channel);
            }
            return typeof success === "function" ? success() : void 0;
          },
          unsubscribe: function(channel, success, error) {
            logger.info("unsubscribing from " + channel);
            dummyChannels = forgeUtils.without(dummyChannels, channel);
            return typeof success === "function" ? success() : void 0;
          },
          subscribedChannels: function(success, error) {
            return typeof success === "function" ? success(dummyChannels) : void 0;
          }
        }
      };
    },
    forgeParse: function(forge) {
      return forge.parse;
    }
  };
});

angular.module('ngForge').provider('platform', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using platformDummy for playing images");
      }
      if (forge.dummy) {
        return this.platformDummy();
      } else {
        return this.forgePlatform(forge);
      }
    },
    platformDummy: function() {
      return {
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
    },
    forgePlatform: function(forge) {
      return forge.platform;
    }
  };
});

angular.module('ngForge').provider('prefs', function() {
  'use strict';

  return {
    $get: function($injector, $localStorage, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using prefsDummy for playing images");
      }
      if (forge.dummy) {
        return this.prefsDummy($localStorage, logger);
      } else {
        return this.forgePrefs(forge);
      }
    },
    prefsDummy: function($localStorage, logger) {
      return {
        prefsObj: function() {
          return $localStorage.prefs != null ? $localStorage.prefs : $localStorage.prefs = {};
        },
        get: function(key, success, error) {
          var e;
          try {
            return typeof success === "function" ? success(this.prefsObj()[key]) : void 0;
          } catch (_error) {
            e = _error;
            logger.error(e.message);
            if (typeof error === "function") {
              error(e);
            }
          }
        },
        set: function(key, value, success, error) {
          var e;
          try {
            this.prefsObj()[key] = value;
            return typeof success === "function" ? success() : void 0;
          } catch (_error) {
            e = _error;
            logger.error(e.message);
            return typeof error === "function" ? error(e) : void 0;
          }
        },
        clear: function(key, success, error) {
          var e;
          try {
            delete this.prefsObj()[key];
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
            delete $localStorage._prefs;
            return typeof success === "function" ? success() : void 0;
          } catch (_error) {
            e = _error;
            logger.error(e.message);
            return typeof error === "function" ? error(e) : void 0;
          }
        },
        keys: function(success, error) {
          var e, prefsObj;
          try {
            prefsObj = this.prefsObj();
            return success(prefsObj ? Object.keys(prefsObj) : void 0);
          } catch (_error) {
            e = _error;
            logger.error(e.message);
            return error(e);
          }
        }
      };
    },
    forgePrefs: function(forge) {
      return forge.prefs;
    }
  };
});

angular.module('ngForge').provider('segmentio', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using segmentioDummy");
      }
      if (forge.dummy) {
        return this.segmentioDummy(logger);
      } else {
        return this.forgeSegmentio(forge);
      }
    },
    segmentioDummy: function(logger) {
      return {
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
    },
    forgeSegmentio: function(forge) {
      return forge.segmentio;
    }
  };
});

angular.module('ngForge').provider('sms', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, logger) {
      if (forge.dummy) {
        logger.debug("using smsDummy for playing images");
      }
      if (forge.dummy) {
        return this.smsDummy(logger);
      } else {
        return this.forgeSms(forge);
      }
    },
    smsDummy: function(logger) {
      return {
        send: function(params, success, error) {
          logger.debug("sms.send " + params.body + " to " + (JSON.stringify(params.to)));
          return typeof success === "function" ? success() : void 0;
        }
      };
    },
    forgeSms: function(forge) {
      return forge.sms;
    }
  };
});

angular.module('ngForge').factory('forgeUtils', function($q) {
  'use strict';
  var slice = [].slice;

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
    lift: function(_this, f) {
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
        f.apply(_this, allArgs);
        return deferred.promise;

      };
    },
    liftGlobalFn: function(f) {
      return this.lift(null, f);
    },
    mapValues: function(obj, fn) {
      var buff, i, k, len, ref;
      if (!obj) {
        return obj;
      }
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
        return value.clone();
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
});
})();