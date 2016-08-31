var fs = require('fs');
var db = require('./db');
var parser = require('./data-parser');

var cards = new Promise((resolve, reject) => {
    fs.readFile('../data/cards.json', 'utf8', function(err, data) {
        if (err) reject(err);
        else resolve(data);
    });
});

var sets = new Promise((resolve, reject) => {
    fs.readFile('../data/sets.json', 'utf8', function(err, data) {
        if (err) reject(err);
        else resolve(data);
    });
});

Promise.all([cards, sets]).then(values => {
    
  var save = (items, set) => {
    console.log(set);
    var collection = db.collection(set);
    collection.drop();
    items.forEach((element, index) => {
      console.log('Adding item from' + set);
      collection.save(element);
    });
  }
    
  var cardData = JSON.parse(values[0]);
  var setData = JSON.parse(values[1]);
  
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
});
