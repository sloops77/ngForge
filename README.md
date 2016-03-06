# ngForge
Angular wrappers for Trigger.io (forge) modules: 
* Promises NOT callbacks
* $http api equivalence (not jquery)
* Mock data in browser mode
* Caching and file modules use localStorage instead

Provides a set of angular adapters to communicate to trigger.io.

Currently the following adapters are provided:
* forge

* contacts
* facebook
* file
* httpProxy (bridges ajax requests to trigger.io's request module in mobile mode)
* logger (forge.logger)
* media
* parse
* platform
* prefs
* segmentio (trigger.io have deprecated this module)
* sms

Furthermore I have a wrapper around the ionic_keyboard module (port of drifty's original with fixes for keyboard behaviour) that is available at https://github.com/sloops77/ionic-keyboard-forge

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

Only a portion of the modules have been mocked so far - so please add your own contributions - make sure that the mock data is scrubbed.
