var gulp = require('gulp');
var fs = require('fs');
var rename = require('gulp-rename');
var remoteSrc = require('gulp-remote-src');

gulp.task('import-cards', function(){
  
  var headers = {}
  
  try {
    var stat = fs.statSync('import/cards.json');
    headers['If-Modified-Since'] = new Date(stat.ctime).toUTCString();
  } catch(e) {
    // do nothing
  }
  
  return remoteSrc('api/cards/', {
      base: 'http://netrunnerdb.com/',
      requestOptions: {
        headers
      }
    })
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(rename('cards.json'))
    .pipe(gulp.dest('import'));
});

