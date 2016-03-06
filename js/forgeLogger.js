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

