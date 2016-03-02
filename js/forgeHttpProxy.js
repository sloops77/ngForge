angular.module('ngForge').provider('$forgeHttp', ['$httpProvider', function($httpProvider) {
  'use strict';

  return {
    interceptors: [],
    $get: ['$http', '$injector', '$q', '$rootScope', '$upload', 'forge', 'logger', 'ngForgeUtils', function($http, $injector, $q, $rootScope, $upload, forge, logger, ngForgeUtils) {
        if (forge.dummy) {
          return this.ngHttp($http, $upload, logger);
        } else {
          return this.forgeHttp($http, $injector, $q, $rootScope, $upload, forge, ngForgeUtils, logger);
        }
      }
    ],
    ngHttp: function($http, $upload, logger) {
      logger.debug("using $http for comms");
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
    forgeHttp: function($http, $injector, $q, $rootScope, $upload, forge, ngForgeUtils, logger) {
      var reversedInterceptors;
      logger.debug("using forge for comms");
      reversedInterceptors = [];
      angular.forEach(this.interceptors, function(interceptorFactory) {
        return reversedInterceptors.unshift(angular.isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
      });
      return {
        _convertRequest: function(config) {
          config['accepts'] = ['application/json'];
          if (config.file == null) {
            config['dataType'] = config.responseType || 'json';
          }
          config['type'] = config.method.toUpperCase();
          if (config.file != null) {
            config['files'] = [config.file];
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