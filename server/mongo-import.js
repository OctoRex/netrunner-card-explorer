var fs = require('fs');
var db = require('./db');
var parser = require('./data-parser');
var request = require('request');

function nrdb(path, url) {

  var modified = new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) resolve(null);
      else resolve(stat.ctime);
    });
  });
  
  return modified.then(value => {
    
    var headers = {}
   
    if (value) {
      headers['If-Modified-Since'] = new Date(value).toUTCString();
    }
    
    var options = {
      url: 'https://netrunnerdb.com' + url,
      headers: headers
    }
    
    return new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('New data from NRDB');
          resolve(body);
        } else {
          console.log('NRDB had no new data: ' + response.statusCode);
          reject('No new data');
        }
      }); 
    });
  });
}

function writeNewData(path, data) {
  console.log('Writing new data to file:' + path);
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', function(err) {
      if (err) reject(err)
      else resolve({'data': data, 'fresh': true});
    });
  });
}

function readPreviousData(path) {
  console.log('Reading old data from file:' + path);
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) reject(err)
      else resolve({'data': data, 'fresh' : true});
    });
  });
}

function getLatestData(path, url) {
  return nrdb(path, url).then(data => {
    return writeNewData(path, data);
  }).catch(err => {
    return readPreviousData(path);
  });
}
var cards = getLatestData('../import/cards.json', '/api/cards/'); 
var sets = getLatestData('../import/sets.json', '/api/sets/');

Promise.all([cards, sets]).then(values => {
  
  if (!values[0].fresh && !values[1].fresh) throw 'No new data, import aborted';
    
  var save = (items, set) => {
    console.log('Adding ' + set);
    var collection = db.collection(set);
    collection.drop();
    items.forEach((element, index) => {
      collection.save(element);
    });
  }
    
  var cardData = JSON.parse(values[0].data);
  var setData = JSON.parse(values[1].data);
  
  var cards = parser.cards(cardData);
  save(cards, 'cards');
  
  var sets = parser.sets(cardData, setData);
  save(sets, 'sets');
  
  var types = parser.types(cardData);
  save(types, 'types');
  
  var subtypes = parser.subtypes(cardData);
  save(subtypes, 'subtypes');
  
  var factions = parser.factions(cardData);
  save(factions, 'factions');
  
  db.close();
}).catch(function(reason){
  console.log('Import failed: ' + reason);
});
