# ngForge
Angular wrappers for Trigger.io (forge) modules: 
* Uses Promises NOT callbacks
* Caching & File modules use localStorage instead
* Request module adapter ($forgeHttp) implements angular's $http api equivalence (not jquery)
* Contact & Facebook modules return configurable mock data in browser mode

Provides a set of angular adapters to communicate to trigger.io.

Currently the following adapters are provided:
* forge (Core Services) -> $forge service

* forge.contact -> $forgeContact service
* forge.facebook -> $forgeFacebook
* forge.file -> $forgeFile
* forge.request -> $forgeHttp (bridges ajax requests to trigger.io's request module in mobile mode)
* forge.logger -> $forgeLogger
* forge.media -> $forgeMedia
* forge.parse -> $forgeParse
* forge.platform -> $forgePlatform
* forge.prefs -> $forgePrefs
* forge.segmentio (trigger.io have deprecated this module) -> $forgeSegmentio
* forge.sms -> $forgeSms

Furthermore I have a wrapper around the ionic_keyboard module (port of drifty/ionic's  original with fixes for keyboard behaviour) that is available at https://github.com/sloops77/ionic-keyboard-forge

The purpose of these adapters is to make it simpler to quickly develop your app in the browser using both standard Angular techniques (i.e. promises rather than callbacks) AND using your favourite javascript build framework (gulp, grunt, etc) - with the trigger.io modules switched out and provide mock data instead.

Once you have included the module using

```angular.module('app', ['ngForge'])```

You can then simply inject in one of the adapters
```
angular.module('app').factory('UserService', ['httpProxy', 'forgePrefs', function(httpProxy, forgePrefs) {
  return {
    loadUser: function(userId) {
      forgePrefs.get('user' + userId).then(function (cachedData) {
        if cachedData
          return JSON.parse(cachedData);
        else
          throw new Error('cache miss')
      }).catch(function() {
        //cache miss or any other error
        httpProxy.get('user/' + userId).then(function (response) {
          forgePrefs.set('user' + userId, JSON.stringify(response.data.user));
          response.data.user
        }); 
      });
    }
  };
}]);
```

Once you are happy with the javascript, html & css you have produced then deploy the app to the simulator or a phone to perfect the integration side of the app.

You can override the configuration of mock data by using a config block 

Only a portion of the modules have been mocked so far - so please add your own contributions - make sure that the mock data is scrubbed.
