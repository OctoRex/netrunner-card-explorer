var fs = require('fs');
var db = require('./db');
var parser = require('./data-parser');
var request = require('request');

// pull the data from NRDB, using modified time if present
function nrdb(url, modified) {

  var headers = {}
 
  // if we provide this header then NRDB will let us know when there's
  // no new data so we don't have to bother processing them
  if (modified) {
    headers['If-Modified-Since'] = new Date(modified).toUTCString();
  }
  
  var options = {
    url: 'https://netrunnerdb.com/api/2.0/public' + url,
    headers: headers
  }
  
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200 && body) {
        console.log('New data from NRDB!');
        resolve(body);
      } else {
        console.log('NRDB had no new data: ' + options.url + ' - ' + response.statusCode);
        reject('No new data');
      }
    }); 
  });
}

// abstract away the saving
var save = function(items, dataType) {
  console.log('Adding ' + dataType);
  var collection = db.collection(dataType);
  collection.drop();
  items.forEach((element, index) => {
    collection.save(element);
  });
  return true;
}

// this needs to be separate as the cards run needs to only mark cards
// as done once all 3 bits have been sorted
var markAsModified = function(dataType) {
  var modified = db.collection('modified');
  return modified.save({'collection': dataType, 'modified': Date.now()});
}

var modified = function(dataType) {
  var collection = db.collection('modified');
  return new Promise((resolve, reject) => {
    collection.findOne({collection: dataType}, function(err, doc) {
      if (doc && typeof doc.modified != 'undefined') {
        resolve(doc.modified);
      } else {
        resolve(null);
      }
    });
  });
}

var cards = modified('cards').then(function(result) {
  return nrdb('/cards', result);
}).then(function(json){
  var data = JSON.parse(json);
  var cards = parser.cards(data.data, data.imageUrlTemplate);
  save(cards, 'cards');
  return data.data;
}).then(function(data) {
  var subtypes = parser.subtypes(data);
  save(subtypes, 'subtypes');
  return data;
}).then(function(data) {
  markAsModified('cards');
}).catch(err => {
  console.log('Error with cards and subtypes ' + err);
  return true;
});

var types = modified('types').then(function(result) {
  return nrdb('/types', result);
}).then(function(json){
  var data = JSON.parse(json);
  var items = parser.types(data.data);
  return save(items, 'types');
}).then(function(data) {
  return markAsModified('types');
}).catch(err => {
  console.log('Error with types ' + err);
  return true;
});

var sets = modified('sets').then(function(result) {
  return nrdb('/packs', result);
}).then(function(json){
  var data = JSON.parse(json);
  var items = parser.sets(data.data);
  return save(items, 'sets');
}).then(function(data) {
  return markAsModified('sets');
}).catch(err => {
  console.log('Error with sets ' + err);
  return true;
});

var factions = modified('factions').then(function(result) {
  return nrdb('/factions', result);
}).then(function(json){
  var data = JSON.parse(json);
  var items = parser.factions(data.data);
  return save(items, 'factions');
}).then(function(data) {
  return markAsModified('factions');
}).catch(err => {
  console.log('Error with factions ' + err);
  return true;
});


Promise.all([cards, sets, factions]).then(function(){
  db.close();
});