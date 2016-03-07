// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2016-03-01 using
// generator-karma 1.0.1

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/angular/angular.js',
      'bower_components/json3/lib/json3.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/lodash/lodash.js',
      'bower_components/restangular/dist/restangular.js',
      'bower_components/wow/dist/wow.js',
      'bower_components/jquery-elastic-grid/js/modernizr.custom.js',
      'bower_components/jquery-elastic-grid/js/classie.js',
      'bower_components/jquery-elastic-grid/js/elastic_grid.js',
      'bower_components/jquery-elastic-grid/js/jquery.elastislide.js,',
      'bower_components/jquery-elastic-grid/js/jquery.hoverdir.js',
      'bower_components/jquery-elastic-grid/js/elastic_grid.encode.js',
      'bower_components/angular-elastic-grid/dist/angular-elastic-grid.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'scripts/app.js',
      'scripts/controllers/main.js',
      'scripts/services/api.js',
      'scripts/directives/loading.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
