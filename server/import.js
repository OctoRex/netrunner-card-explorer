var request = require('request');
var fs = require('fs');
var parser = require('./data-parser');
var uglify = require('uglify-js');

var cards = {data: false, fresh: false};
var sets = {data: false, fresh: false};

function parse() {
  
  if (cards.data && sets.data && (cards.fresh || sets.fresh)) {
    
    var cardData = JSON.parse(cards.data);
    var setData = JSON.parse(sets.data);
    
    contents = "var data = data || {};\ndata.cards = " + JSON.stringify(parser.cards(cardData)) + ";\n";
    contents += 'data.sets = ' + JSON.stringify(parser.sets(cardData, setData)) + ";\n";
    contents += 'data.types = ' + JSON.stringify(parser.types(cardData)) + ";\n";
    contents += 'data.subtypes = ' + JSON.stringify(parser.subtypes(cardData)) + ";\n";
    contents += 'data.factions = ' + JSON.stringify(parser.factions(cardData)) + ";\n";
          
    var result = uglify.minify(contents, {fromString: true});
    
    fs.writeFile(__dirname + "/../public/js/data.js", result.code, 'utf8', function(err) {
      if (err) throw err;
      console.log('Data successfully parsed');
    });
  }
}

function checkAndFetch(path, url, obj) {

  var headers = {}

  try {
    var stat = fs.statSync(path);
    headers['If-Modified-Since'] = new Date(stat.ctime).toUTCString();
  } catch(e) {
    // do nothing
  }

  var options = {
    url: url,
    headers: headers
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      
      fs.writeFile(path, body, 'utf8', function(err) {
        if (err) throw err;
        obj.data = body;
        obj.fresh = true;
        parse();
      }); 
    } else {
      fs.readFile(path, 'utf8', function (err, data) {
        if (err) throw err;
        obj.data = data;
        parse();
      });
    }
  }); 
}

checkAndFetch(__dirname + '/../import/cards.json', 'http://netrunnerdb.com/api/cards/', cards);
checkAndFetch(__dirname + '/../import/sets.json', 'http://netrunnerdb.com/api/sets/', sets);
