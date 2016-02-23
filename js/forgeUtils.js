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