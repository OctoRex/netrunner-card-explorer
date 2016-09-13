
var gulp = require('gulp');

gulp.task('dev', ['watch:js', 'watch:css', 'watch:lint', 'tests.client']);