var gulp = require('gulp');
var rename = require('gulp-rename');
var intercept = require('gulp-intercept');
var remoteSrc = require('gulp-remote-src');
var parser = require('../server/data-parser.js');

gulp.task('import', function(){
    
  remoteSrc('api/cards/', {
      base: 'http://netrunnerdb.com/'
    })
    .pipe(intercept(function(file){
      
      var contents = file.contents.toString();
      var cards = JSON.parse(file.contents.toString());
      contents = 'var data = data || {}; data.cards = ' + contents + ";\n";
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

gulp.task('watch:import', function() {
  gulp.watch('gulp/import.js', ['import']);
});
