# ngForge
Angular wrappers for Trigger.io (forge) modules: 
* Uses Promises NOT callbacks
* All Trigger.io module methods are available (but only a portion are mocked)
* Caching & File modules use localStorage instead
* Request module adapter ($forgeHttp) implements angular's $http api equivalence (not jquery)
* Contact & Facebook modules return configurable mock data in browser mode

Provides a set of angular adapters to communicate to trigger.io.

## Quickstart

Once you have included the module using

```angular.module('app', ['ngForge'])```

You can then simply inject in one of the adapters
```
angular.module('app').factory('UserService', ['$forgeHttp', '$forgePrefs', function($forgeHttp, $forgePrefs) {
  return {
    loadUser: function(userId) {
      $forgePrefs.get('user' + userId).then(function (cachedData) {
        if cachedData
          return cachedData;
        else
          throw new Error('cache miss')
      }).catch(function() {
        //cache miss or any other error
        $forgeHttp.get('user/' + userId).then(function (response) {
          $forgePrefs.set('user' + userId, response.data.user);
          response.data.user
        }); 
      });
    }
  };
}]);
```

Once you are happy with the javascript, html & css you have produced then deploy the app to the simulator or a phone to perfect the integration side of the app.

## Adapters
### What's Implemented?
Currently the following adapters are provided:

| Trigger.io Module | ngForge Service | Configurable Properties | Web Mock Notes
|------------|----------|--------------|--------------
| forge (Core Services)   | $forge | testConnectionUrl | is, event & tools only           
| forge.contact      | $forgeContact  | sampleContacts | select, selectById, selectAll only
| forge.facebook    | $forgeFacebook  | sampleKeyHash | _all implemented_
| forge.file    | $forgeFile      | | isFile, getLocal, cacheURL, URL, remove only
| forge.request  | $forgeHttp   | | $http.get, $http.head, $http.post, $http.put, $http.delete, $http.jsonp
| forge.logger   | $forgeLogger | | _all implemented_
| forge.media   | $forgeMedia | | createAudioPlayer only            
| forge.parse   | $forgeParse | | _all implemented_
| forge.platform    | $forgePlatform | | _all implemented_
| forge.prefs  | $forgePrefs   | prefsKey | | _all implemented_           
| forge.segmentio   | $forgeSegmentio | | _all implemented_
| forge.sms   | $forgeSms  |  | _all implemented_      
| forge.ionic_keyboard** | $forgeIonicKeyboard |  | _all implemented_

** There is a wrapper around the ionic_keyboard module (port of drifty/ionic's  original with fixes for keyboard behaviour) that is available at https://github.com/sloops77/ionic-keyboard-forge

The purpose of these adapters is to make it simpler to quickly develop your app in the browser using both standard Angular techniques (i.e. promises rather than callbacks) AND using your favourite javascript build framework (gulp, grunt, etc) - with the trigger.io modules switched out and provide mock data instead.

### Configuration
All Services are written using provider style which means you can override the configuration of properties by using a config block. Configurable properties are described in the table above. This is an example of how you can configure a provider:
```
angular.module('app').config('$forgeFacebookProvider', [($forgeFacebookProvider) ->
  $forgeFacebookProvider.sampleKeyHash = 'NteSLOyHHHx12WUnrW0NEbwcY2Y'
]);
```

Only a portion of the modules have been mocked so far - so please add your own contributions - make sure that the mock data is scrubbed.
