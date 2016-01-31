var gulp = require('gulp');
var fs = require('fs');
var rename = require('gulp-rename');
var remoteSrc = require('gulp-remote-src');

gulp.task('import-sets', function(){
  
  var headers = {}
  
  try {
    var stat = fs.statSync('import/sets.json');
    headers['If-Modified-Since'] = new Date(stat.ctime).toUTCString();
  } catch(e) {
    // do nothing
  }
  
  return remoteSrc('api/sets/', {
      base: 'http://netrunnerdb.com/',
      requestOptions: {
        headers
      }
    })
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(rename('sets.json'))
    .pipe(gulp.dest('import'));
});

