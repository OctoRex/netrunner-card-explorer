
var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

gulp.task('js', function(){
  return gulp.src(['client/app.js', 'client/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

gulp.task('js:production', function(){
  return gulp.src(['client/app.js', 'client/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch:js', ['js'], function() {
  gulp.watch('client/**/*.js', ['js']);
});
