angular.module('ngForge').provider('$forgeContact', function() {
  'use strict';

  return {
    $get: [
      '$injector', '$q', 'forge', 'logger', 'ngForgeUtils', function($injector, $q, forge, logger, ngForgeUtils) {
        var $forgeContactProvider = this;

        var contactDummy = {
          select: function(success, error) {
            logger.debug("select");
            return typeof success === "function" ? success() : void 0;
          },
          selectAll: function(fields, success, error) {
            if (ngForgeUtils.isFunction(fields)) {
              fields = ['id', 'displayName'];
              success = fields;
              error = success;
            }
            logger.debug("selectAll");
            return typeof success === "function" ? success($forgeContactProvider.sampleContacts.map(function(c) {
              return ngForgeUtils.pick(c, fields);
            })) : void 0;
          },
          selectById: function(id, success, error) {
            logger.debug("selectById");
            return typeof success === "function" ? success(ngForgeUtils.find($forgeContactProvider.sampleContacts, function(c) {
              return c.id === id;
            })) : void 0;
          }
        };
        return ngForgeUtils.liftObject(forge.dummy ? contactDummy : forge.contact);
      }
    ],
    sampleContacts: [
      {
        "id": "14894",
        "displayName": "Gal Gadot",
        "name": {
          "formatted": "Gal Gadot",
          "familyName": "Gadot",
          "givenName": "Gal",
          "middleName": null,
          "honorificPrefix": "",
          "honorificSuffic": null
        },
        "nickname": "",
        "phoneNumbers": [
          {
            "value": "+447574712444",
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
            "value": "+44 751-5097756+13",
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
            "value": "+33 7817471244",
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
        "displayName": "Eddie Redmayne",
        "name": {
          "formatted": "Eddie Redmayne",
          "familyName": "Fenech",
          "givenName": "Eddie",
          "middleName": null,
          "honorificPrefix": "",
          "honorificSuffic": null
        },
        "nickname": "",
        "phoneNumbers": [
          {
            "value": "+447432111412",
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
        "displayName": "Arow",
        "name": {
          "formatted": "Arow",
          "familyName": "Arow"
        },
        "nickname": "",
        "phoneNumbers": [
          {
            "value": "+972 963587331",
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
        "displayName": "Girt Wenders",
        "name": {
          "formatted": "Girt Wenders",
          "familyName": "Wenders",
          "givenName": "Girt",
          "middleName": null,
          "honorificPrefix": "",
          "honorificSuffic": null
        },
        "nickname": "",
        "phoneNumbers": [
          {
            "value": "+972 521123241",
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
            "value": "+44 7967929796",
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
            "value": "+44-783-241324",
            "type": "work",
            "pref": false
          }
        ]
      }, {
        "id": "2",
        "displayName": "Mr Bodie Carstairs",
        "name": {
          "formatted": "Bodie Carstairs",
          "familyName": "Carstairs",
          "givenName": "Bodie",
          "middleName": null,
          "honorificPrefix": "",
          "honorificSuffic": null
        },
        "nickname": "Bo",
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
        "displayName": "Sarah",
        "name": {
          "formatted": "Sarah",
          "familyName": "",
          "givenName": "Sarah",
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
            "value": "+335723131231",
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
    ]
  };
});
