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