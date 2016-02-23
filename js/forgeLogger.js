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
