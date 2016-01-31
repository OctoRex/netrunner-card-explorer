
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function(){
  return gulp.src(['client/module.js', 'client/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch:js', ['js'], function() {
  gulp.watch('client/**/*.js', ['js']);
});
