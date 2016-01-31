var gulp = require('gulp');
var fs = require('fs');
var intercept = require('gulp-intercept');
var parser = require('../server/data-parser.js');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var insert = require('gulp-insert');

gulp.task('parse-data', function(cb){
  
  var cardsTime, setsTime, dataTime;
  
  try {
    var stat = fs.statSync('import/cards.json');
    cardsTime = new Date(stat.ctime);
  } catch(e) {
    // do nothing
  }
  
  try {
    var stat = fs.statSync('import/sets.json');
    setsTime = new Date(stat.ctime);
  } catch(e) {
    // do nothing
  }
  
  try {
    var stat = fs.statSync('public/js/data.js');
    dataTime = new Date(stat.ctime);
  } catch(e) {
    // do nothing
  }
  
  if (setsTime <= dataTime && cardsTime <= dataTime) {
    console.log('Aborted parse as data is not new');
    cb();
    return;
  }

  return gulp.src(['import/cards.json', 'import/sets.json'])
    .pipe(insert.append('####'))
    .pipe(concat('data.js'))
    .pipe(intercept(function(file){
      
      var contents = file.contents.toString();
      var bits = contents.split('####');
      
      var cards = JSON.parse(bits[0]);
      var sets = JSON.parse(bits[1]);
      contents = 'var data = data || {}; data.cards = ' + JSON.stringify(parser.cards(cards)) + ";\n";
      contents += 'data.sets = ' + JSON.stringify(parser.sets(cards, sets)) + ";\n";
      contents += 'data.types = ' + JSON.stringify(parser.types(cards)) + ";\n";
      contents += 'data.subtypes = ' + JSON.stringify(parser.subtypes(cards)) + ";\n";
      contents += 'data.factions = ' + JSON.stringify(parser.factions(cards)) + ";\n";
      file.contents = new Buffer(contents);
      
      return file;
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

