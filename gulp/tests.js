
var gulp = require('gulp'),
 karma = require('karma')

gulp.task('tests.client', function(done){ 
	var karmaServer = new karma.Server({
		configFile: __dirname + '/../karma.conf.js'
	}, function () {
		done();
	}).start();
});