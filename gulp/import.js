var gulp = require('gulp');
var fs = require('fs');
var rename = require('gulp-rename');
var intercept = require('gulp-intercept');
var remoteSrc = require('gulp-remote-src');
var parser = require('../server/data-parser.js');

gulp.task('import', function(){
  
  var headers = {}
  
  try {
    var stat = fs.statSync('public/js/data.js');
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // headers['If-Modified-Since'] = yesterday.toUTCString();
  } catch(e) {
    // do nothing
  }
    
  remoteSrc('api/cards/', {
      base: 'http://netrunnerdb.com/',
      requestOptions: {
        headers
      }
    })
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(intercept(function(file){
      
      var contents = file.contents.toString();
      var cards = parser.cards(JSON.parse(file.contents.toString()));
      contents = 'var data = data || {}; data.cards = ' + JSON.stringify(cards) + ";\n";
      contents += 'data.sets = ' + JSON.stringify(parser.sets(cards)) + ";\n";
      contents += 'data.types = ' + JSON.stringify(parser.types(cards)) + ";\n";
      contents += 'data.subtypes = ' + JSON.stringify(parser.subtypes(cards)) + ";\n";
      contents += 'data.factions = ' + JSON.stringify(parser.factions(cards)) + ";\n";
      file.contents = new Buffer(contents);
      
      return file;
    }))
    .pipe(rename('data.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch:import', ['import'], function() {
  gulp.watch('gulp/import.js', ['import']);
});
