var gulp   = require('gulp'),
	jshint = require('gulp-jshint');
 
gulp.task('lint', function() {
  return gulp.src(['test/**/*.js', 'client/**/*.js', 'server/**/*.js'])
    .pipe(jshint({esversion: 6}))
    .pipe(jshint.reporter('default'));
});

gulp.task('watch:lint', ['lint'], function(){
	gulp.watch(['test/**/*.js', 'client/**/*.js', 'server/**/*.js'], ['lint']);
});
