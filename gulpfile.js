'use strict';

var gulp = require('gulp');

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'dist';

  swPrecache.write(`${rootDir}/service-worker.js`, {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,map,ico}'],
    stripPrefix: rootDir,
    replacePrefix: '.'
  }, callback);
});

gulp.task('default', ['generate-service-worker']);
