var gulp = require('gulp');
var fs = require('fs');
var rename = require('gulp-rename');
var intercept = require('gulp-intercept');
var remoteSrc = require('gulp-remote-src');
var parser = require('../server/data-parser.js');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var insert = require('gulp-insert');

gulp.task('import', ['import-cards', 'import-sets'], function(){
  gulp.start('parse-data');
});

gulp.task('watch:import', ['import'], function() {
  gulp.watch('gulp/import.js', ['import']);
});
