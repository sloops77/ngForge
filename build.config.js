var pkg = require('./package.json');
var fs = require('fs');

module.exports = {
  dist: 'dist',

  protractorPort: 8876,

  banner:
  '/*!\n' +
  ' * Copyright 2015 Thinking Bytes Ltd.\n' +
  ' *\n' +
  ' * ngForge, v<%= pkg.version %>\n' +
  ' * Angular wrappers for Trigger.io (forge) modules.\n' +
  ' * http://trigger.io/\n' +
  ' * http://angularjs.org/\n' +
  ' *\n' +
  ' * By @arolave <3\n' +
  ' *\n' +
  ' * Licensed under the MIT license. Please see LICENSE for more information.\n'+
  ' *\n' +
  ' */\n\n',
  closureStart: '(function() {\n',
  closureEnd: '\n})();',

  files: [
    'js/*.js',
  ],

  //Exclamation can be no longer than 14 chars
  exclamations: [
    "Aah","Ah","Aha","All right","Aw","Ay","Aye","Bah","Boy","By golly","Boom","Cheerio","Cheers","Come on","Crikey","Dear me","Egads","Fiddle-dee-dee","Gadzooks","Gangway","G'day","Gee whiz","Gesundheit","Get outta here","Gosh","Gracious","Great","Gulp","Ha","Ha-ha","Hah","Harrumph","Hey","Hooray","Hurray","Huzzah","I say","Look","Look here","Long time","Lordy","Most certainly","My my","My word","Oh","Oh-oh","Oh no","Okay","Okey-dokey","Ooh","Oye","Phew","Quite","Ready","Right on","Roger that","Rumble","Say","See ya","Snap","Sup","Ta-da","Take that","Tally ho","Thanks","Toodles","Touche","Tut-tut","Very nice","Very well","Voila","Vroom","Well done","Well, well","Whoa","Whoopee","Whew","Word up","Wow","Wuzzup","Ya","Yea","Yeah","Yippee","Yo","Yoo-hoo","You bet","You don't say","You know","Yow","Yum","Yummy","Zap","Zounds","Zowie"
  ],

  //Message can be no longer than it is. Currently it's 126 chars with the short git urls,
  //and can have up to a 14 char long exclamation prepended.
  releaseMessage: function() {
    return this.exclamations[Math.floor(Math.random()*this.exclamations.length)] + '! ' +
      'Just released @IonicFramework v' + pkg.version + ' "' + pkg.codename + '"! ' +
      this.releasePostUrl;
  },

};
