angular.module('ngForge').provider('contact', function() {
  'use strict';

  return {
    $get: function($injector, $q, forge, forgeUtils, logger) {
      if (forge.dummy) {
        logger.debug("using contactDummy for playing images");
      }
      if (forge.dummy) {
        return this.contactDummy(forgeUtils, logger);
      } else {
        return this.forgeContact(forge);
      }
    },
    contactDummy: function(forgeUtils, logger) {
      return {
        _examples: [
          {
            "id": "14894",
            "displayName": "Gal Goltzman",
            "name": {
              "formatted": "Gal Goltzman",
              "familyName": "Goltzman",
              "givenName": "Gal",
              "middleName": null,
              "honorificPrefix": "",
              "honorificSuffic": null
            },
            "nickname": "",
            "phoneNumbers": [
              {
                "value": "+972574712441",
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
                "value": "+972 51-5097756+13",
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
                "value": "+447817471244",
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
            "displayName": "Eddie Fenech",
            "name": {
              "formatted": "Eddie Fenech",
              "familyName": "Fenech",
              "givenName": "Eddie",
              "middleName": null,
              "honorificPrefix": "",
              "honorificSuffic": null
            },
            "nickname": "",
            "phoneNumbers": [
              {
                "value": "+447432112312",
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
            "displayName": "Aro",
            "name": {
              "formatted": "Aro",
              "familyName": "Aro"
            },
            "nickname": "",
            "phoneNumbers": [
              {
                "value": "+9727963587331",
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
            "displayName": "Guy kedara",
            "name": {
              "formatted": "Guy kedara",
              "familyName": "kedara",
              "givenName": "Guy",
              "middleName": null,
              "honorificPrefix": "",
              "honorificSuffic": null
            },
            "nickname": "",
            "phoneNumbers": [
              {
                "value": "+44732112324",
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
                "value": "+972 547929796",
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
                "value": "+972-4324-1324",
                "type": "work",
                "pref": false
              }
            ]
          }, {
            "id": "2",
            "displayName": "Mr Joe Carstairs",
            "name": {
              "formatted": "Joe Carstairs",
              "familyName": "Carstairs",
              "givenName": "Joe",
              "middleName": null,
              "honorificPrefix": "",
              "honorificSuffic": null
            },
            "nickname": "Joey",
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
            "displayName": "sarit",
            "name": {
              "formatted": "sarit",
              "familyName": "",
              "givenName": "sarit",
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
                "value": "+972723131231",
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
        ],
        select: function(success, error) {
          logger.debug("select");
          return typeof success === "function" ? success() : void 0;
        },
        selectAll: function(fields, success, error) {
          if (forgeUtils.isFunction(fields)) {
            fields = ['id', 'displayName'];
            success = fields;
            error = success;
          }
          logger.debug("selectAll");
          return typeof success === "function" ? success(this._examples.map(function(c) {
            return forgeUtils.pick(c, fields);
          })) : void 0;
        },
        selectById: function(id, success, error) {
          logger.debug("selectById");
          return typeof success === "function" ? success(forgeUtils.find(this._examples, function(c) {
            return c.id === id;
          })) : void 0;
        }
      };
    },
    forgeContact: function(forge) {
      return forge.contact;
    }
  };
});
