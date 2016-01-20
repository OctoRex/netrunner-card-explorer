var gulp = require('gulp');
var rename = require('gulp-rename');
var intercept = require('gulp-intercept');
var remoteSrc = require('gulp-remote-src');

var parseSets = function(cards) {
  var setCodes = ['draft'];
  var sets = [];
  
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (setCodes.indexOf(card.set_code) == -1) {
      setCodes.push(card.set_code);
      sets.push({value: card.set_code, label: card.setname});
    }
  }
  
  return 'var data = data || {}; data.sets = ' + JSON.stringify(sets) + ';';
}

var parseTypes = function(cards) {
  var typeCodes = [];
  var types = [];
  
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (typeCodes.indexOf(card.type_code) == -1) {
      typeCodes.push(card.type_code);
      types.push({value: card.type_code, label: card.type});
    }
  }
  
  return 'var data = data || {}; data.types = ' + JSON.stringify(types) + ';';
}

var parseSubtypes = function(cards) {
  var subtypeCodes = [];
  var subtypes = [];
  
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.subtype_code) {
      var codes = card.subtype_code.split(' - ');
      var names = card.subtype.split(' - ');
      for (var j = 0; j < codes.length; j++) {
        if (subtypeCodes.indexOf(codes[j]) == -1) {
          subtypeCodes.push(codes[j]);
          subtypes.push({value: codes[j], label: names[j]});
        }
      }
    }
  }
  
  return 'var data = data || {}; data.subtypes = ' + JSON.stringify(subtypes) + ';';
}

gulp.task('import', function(){
    
  remoteSrc('api/cards/', {
      base: 'http://netrunnerdb.com/'
    })
    .pipe(intercept(function(file){
      
      var contents = file.contents.toString();
      var cards = JSON.parse(file.contents.toString());
      contents = 'var data = data || {}; data.cards = ' + contents + ';';
      contents += "\n" + parseSets(cards);
      contents += "\n" + parseTypes(cards);
      contents += "\n" + parseSubtypes(cards);
      file.contents = new Buffer(contents);
      
      return file;
    }))
    .pipe(rename('data.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch:import', function() {
  gulp.watch('gulp/import.js', ['import']);
});
