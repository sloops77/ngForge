var GithubApi = require('github');
var gulp = require('gulp');
var path = require('canonical-path');
var pkg = require('./package.json');
var request = require('request');
var q = require('q');
var semver = require('semver');
var through = require('through');

var argv = require('minimist')(process.argv.slice(2));

var _ = require('lodash');
var buildConfig = require('./build.config.js');
var changelog = require('conventional-changelog');
var es = require('event-stream');
var irc = require('ircb');
var marked = require('marked');
var mkdirp = require('mkdirp');
var twitter = require('node-twitter-api');

var cp = require('child_process');
var fs = require('fs');

var concat = require('gulp-concat');
var footer = require('gulp-footer');
var gulpif = require('gulp-if');
var header = require('gulp-header');
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var template = require('gulp-template');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var banner = _.template(buildConfig.banner, { pkg: pkg });

var IS_RELEASE_BUILD = !!argv.release;
if (IS_RELEASE_BUILD) {
  gutil.log(
    gutil.colors.red('--release:'),
    'Building release version (minified, debugs stripped)...'
  );
}

/**
 * Load Test Tasks
 */
//require('./config/gulp-tasks/test')(gulp, argv);

/**
 * Load Docs Tasks
 */
//require('./config/gulp-tasks/docs')(gulp, argv);

if (argv.dist) {
  buildConfig.dist = argv.dist;
}

gulp.task('default', ['build']);
gulp.task('build', ['bundle']);
gulp.task('validate', ['jscs', 'eslint', 'ddescribe-iit']);

var IS_WATCH = false;
gulp.task('watch', ['build'], function() {
  IS_WATCH = true;
  gulp.watch('js/**/*.js', ['bundle']);
});

gulp.task('changelog', function() {
  var dest = argv.dest || 'CHANGELOG.md';
  var toHtml = !!argv.html;
  return makeChangelog(argv).then(function(log) {
    if (toHtml) {
      log = marked(log, {
        gfm: true
      });
    }
    fs.writeFileSync(dest, log);
  });
});

function makeChangelog(options) {
  var file = options.standalone ? '' : __dirname + '/CHANGELOG.md';
  var subtitle = options.subtitle || '';
  var from = options.from;
  var version = options.version || pkg.version;
  var deferred = q.defer();
  changelog({
    repository: 'https://github.com/sloops77/ngForge',
    version: version,
    subtitle: subtitle,
    file: file,
    from: from
  }, function(err, log) {
    if (err) deferred.reject(err);
    else deferred.resolve(log);
  });
  return deferred.promise;
}

gulp.task('bundle', [
  'scripts',
  'version'
]);

gulp.task('jscs', function() {
  return gulp.src(['js/**/*.js'])
    .pipe(jscs({
      configPath: '.jscs.json'
    }));
});

gulp.task('eslint', function() {
  return gulp.src(['js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('ddescribe-iit', function() {
  return gulp.src(['test/**/*.js', 'js/**/*.js'])
    .pipe(notContains([
      'ddescribe', 'iit', 'xit', 'xdescribe'
    ]));
});

gulp.task('scripts', function() {
  return gulp.src(buildConfig.files)
    .pipe(gulpif(IS_RELEASE_BUILD, stripDebug()))
    .pipe(concat('ngForge.js'))
    .pipe(header(buildConfig.closureStart))
    .pipe(footer(buildConfig.closureEnd))
    .pipe(header(banner))
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(gulpif(IS_RELEASE_BUILD, uglify()))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(header(banner))
    .pipe(gulp.dest(buildConfig.dist));
});

gulp.task('version', function() {
  var d = new Date();
  var date = d.toISOString().substring(0,10);
  var time = pad(d.getUTCHours()) +
    ':' + pad(d.getUTCMinutes()) +
    ':' + pad(d.getUTCSeconds());
  return gulp.src('version.template.json')
    .pipe(template({
      pkg: pkg,
      date: date,
      time: time
    }))
    .pipe(rename('version.json'))
    .pipe(gulp.dest(buildConfig.dist));
});

/*
 gulp.task('release-tweet', function(done) {
 var oauth = {
 consumerKey: process.env.TWITTER_CONSUMER_KEY,
 consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
 accessToken: process.env.TWITTER_ACCESS_TOKEN,
 accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
 };
 var client = new twitter(oauth);
 client.statuses(
 'update',
 {
 status: argv.test ?
 'This is a test.' :
 buildConfig.releaseMessage()
 },
 oauth.accessToken,
 oauth.accessTokenSecret,
 done
 );
 });
 */

/*
 gulp.task('release-irc', function(done) {
 var client = irc({
 host: 'irc.freenode.net',
 secure: true,
 nick: 'ionitron',
 username: 'ionitron',
 realName: 'ionitron',
 channels: ['#ionic']
 }, function() {
 client.say('#ionic', argv.test ? 'This is a test.' : buildConfig.releaseMessage(), function() {
 client.quit('', done);
 });
 });
 });
 */

gulp.task('release-github', function(done) {
  var github = new GithubApi({
    version: '3.0.0'
  });
  github.authenticate({
    type: 'oauth',
    token: process.env.GH_TOKEN
  });
  makeChangelog({
    standalone: true
  })
    .then(function(log) {
      var version = 'v' + pkg.version;
      github.releases.createRelease({
        owner: 'sloops77',
        repo: 'ngForge',
        tag_name: version,
        name: 'ngForge-' + version,
        body: log
      }, done);
    })
    .fail(done);
});

//gulp.task('release-discourse', function(done) {
//  var oldPostUrl = buildConfig.releasePostUrl;
//  var newPostUrl;
//
//  return makeChangelog({
//    standalone: true
//  })
//    .then(function(changelog) {
//      var content = 'Download Instructions: https://github.com/driftyco/ionic#quick-start\n\n' + changelog;
//      return qRequest({
//        url: 'http://forum.ionicframework.com/posts',
//        method: 'post',
//        form: {
//          api_key: process.env.DISCOURSE_TOKEN,
//          api_username: 'Ionitron',
//          title: argv.test ?
//            ('This is a test. ' + Date.now()) :
//          'v' + pkg.version + ' "' + pkg.codename + '" released!',
//          raw: argv.test ?
//            ('This is a test. Again! ' + Date.now()) :
//            content
//        }
//      });
//    })
//    .then(function(res) {
//      var body = JSON.parse(res.body);
//      newPostUrl = 'http://forum.ionicframework.com/t/' + body.topic_slug + '/' + body.topic_id;
//      fs.writeFileSync(buildConfig.releasePostFile, newPostUrl);
//
//      return q.all([
//        updatePost(newPostUrl, 'closed', true),
//        updatePost(newPostUrl, 'pinned', true),
//        oldPostUrl && updatePost(oldPostUrl, 'pinned', false)
//      ]);
//    });
//
//  function updatePost(url, statusType, isEnabled) {
//    return qRequest({
//      url: url + '/status',
//      method: 'put',
//      form: {
//        api_key: process.env.DISCOURSE_TOKEN,
//        api_username: 'Ionitron',
//        status: statusType,
//        enabled: !!isEnabled
//      }
//    });
//  }
//});

function notContains(disallowed) {
  disallowed = disallowed || [];

  return through(function(file) {
    var error;
    var contents = file.contents.toString();
    disallowed.forEach(function(str) {
      var idx = disallowedIndex(contents, str);
      if (idx !== -1) {
        error = error || file.path + ' contains ' + str + ' on line ' +
          contents.substring(0, idx, str).split('\n').length + '!';
      }
    });
    if (error) {
      throw new Error(error);
    } else {
      this.emit('data', file);
    }
  });

  function disallowedIndex(content, disallowedString) {
    var notFunctionName = '[^A-Za-z0-9$_]';
    var regex = new RegExp('(^|' + notFunctionName + ')(' + disallowedString + ')' + notFunctionName + '*\\(', 'gm');
    var match = regex.exec(content);
    // Return the match accounting for the first submatch length.
    return match !== null ? match.index + match[1].length : -1;
  }
}
function pad(n) {
  if (n<10) { return '0' + n; }
  return n;
}
function qRequest(opts) {
  var deferred = q.defer();
  request(opts, function(err, res, body) {
    if (err) deferred.reject(err);
    else deferred.resolve(res);
  });
  return deferred.promise;
}
