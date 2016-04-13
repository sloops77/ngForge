# ngForge
Angular & Trigger.IO are a great combination for developing mobile apps. Using either iOS or Crosswalk for Android it’s possible to build hybrid mobile apps we could only dream of in the past few years.

**ngForge** is a set of Angular wrappers for Trigger.io Forge modules with the aim to:

1. Seemlessly switch between mobile & browser implementations
2. Provide a AngularJS friendly experience:
  * Dependency Injection not globals.
  * Promises not callbacks.
  * $http API equivalency for the request module using `$forgeHttp`.
3. Provide a basis for use in modern JS development:
  * Use the browser as the primary development environment – because there are many commonplace, well supported, free tools.
  * Don’t require trigger.io builds in the browser environment.
  * Be optimised for standard JS build tools: Grunt, Gulp, etc.
4. Allow services to be configured & reconfigured on the fly in browser mode.

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
| forge.camera | $forgeCamera | | _all implemented_
| forge.contact      | $forgeContact  | sampleContacts | select, selectById, selectAll only
| forge.facebook    | $forgeFacebook  | sampleKeyHash | _all implemented_
| forge.file    | $forgeFile      | | isFile, getLocal, cacheURL, URL, remove only
| forge.request  | $forgeHttp   | | $http.get, $http.head, $http.post, $http.put, $http.delete, $http.jsonp
| forge.launchimage | $forgeLaunchimage | | _all implemented_
| forge.logger   | $forgeLogger | | _all implemented_
| forge.media   | $forgeMedia | | createAudioPlayer only            
| forge.parse   | $forgeParse | | _all implemented_
| forge.payments   | $forgePayments | | _all implemented_
| forge.platform    | $forgePlatform | | _all implemented_
| forge.prefs  | $forgePrefs   | prefsKey | | _all implemented_.           
| forge.segmentio   | $forgeSegmentio | | _all implemented_
| forge.sms   | $forgeSms  |  | _all implemented_      
| forge.ionic_keyboard** | $forgeIonicKeyboard |  | _all implemented_

** There is a wrapper around the ionic_keyboard module (port of drifty/ionic's  original with fixes for keyboard behaviour) that is available at https://github.com/sloops77/ionic-keyboard-forge

The purpose of these adapters is to make it simpler to quickly develop your app in the browser using both standard Angular techniques (i.e. promises rather than callbacks) AND using your favourite javascript build framework (gulp, grunt, etc) - with the trigger.io modules switched out and provide mock data instead.

### Configuration
In browser mode, ngForge services can be configured by using Angular config methods. You may want to configure:

1. Mock data: for example the mock contact book data used by $forgeContact, or
2. Implementation configuration, for example what key to store data under when using the localStorage version of $forgePrefs.

Each service documents what is configurable. Here is an example config:
```
angular.module('app').config([‘$forgePrefsProvider’, function($forgePrefsProvider) {
    $forgePrefsProvider.prefsKey = ‘customPrefix’
}]);
```

### Using the `$forgeHttp` wrapper of the `forge.request` module
Trigger.io’s forge.request module offers cross-origin access and native performance for HTTP request.

However, the request module’s API is based on a subset of the JQuery API and if you are using Angular it would be preferable to replicate the $http service API. (See the [Angular $http service documentation]((https://docs.angularjs.org/api/ng/service/$http) for more details.)

This is what the $forgeHttp API looks like:
```
$http.get(url, config)
$http.head(url, config)
$http.patch(url, data, config)
$http.post(url, data, config)
$http.put(url, data, config)
$http.delete(url, config)
$http.jsonp(url, config)
```
The following methods are not implemented as yet:
```
$http(config)
```
Additionally, the `config` object supports the following properties:

* `params` – `{string|Object}`: Params that are not already query strings are serialized as query strings and appended to the URL.
* `data` – `{Object}`: Data to be sent as the request message data. If it’s a get request then it is serialized as a query string and appended to the URL.
* `headers` – `{Object}`: Map of strings representing HTTP headers to send to the server.
* `cache` – `{boolean|Object}`: A boolean value or object created with $cacheFactory to enable or disable caching of the HTTP response.
* `timeout` – `{number}`: timeout in milliseconds
* `responseType` – `{string}`: See XMLHttpRequest.responseType.

All these methods return a promise that support the standard methods: `then`, `catch` & `finally` methods that take function with a single argument of the http response object. It also supports the deprecated `success` & `error` methods for handling responses. See the [Angular Promises Documentation](https://docs.angularjs.org/api/ng/service/$q) for more detail.

Results of `get` are, by default, not cached. Caching is supported in the same way as in `$http`, that is, by default using simply the value true, or by an instance of `$cacheFactory`. (See the [Angular $http caching documentation](https://docs.angularjs.org/api/ng/service/$http#caching) for more information)

We also support interceptors that allows you to implement cross cutting concerns for requests or response. Simply add interceptors to the `$httpProvider` as in the [Angular documentation](https://docs.angularjs.org/api/ng/service/$http#interceptors).

### Finally
Only a portion of the modules have been mocked so far - so please add your own contributions - make sure that the mock data is scrubbed.
