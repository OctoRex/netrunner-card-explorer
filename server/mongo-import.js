var parser = require('./data-parser');
var importer = require('./data-importer');

// cards and subtypes (which needs to be parsed from cards)
// get the modified time
var cards = importer.modifiedTime('cards').then(function(result) {
  return importer.nrdb('/cards', result);
// then parse and save the JSON
}).then(function(json){
  var data = JSON.parse(json);
  // allow the parser to filter out bits and bobs
  var cards = parser.cards(data.data, data.imageUrlTemplate);
  // save 'em
  importer.save(cards, 'cards');
  return data.data;
// then parse/save the subtypes data
}).then(function(data) {
  var subtypes = parser.subtypes(data);
  importer.save(subtypes, 'subtypes');
  return data;
// after both we can marks cards as modified (don't need to bother
// with marking subtypes as cards is the same thing
}).then(function(data) {
  importer.markModified('cards');
// we want to return true on the error regarless so we 
// can trigger our Promise.all and wrap up (close the db)
}).catch(err => {
  console.log('Error with cards and subtypes ' + err);
  return true;
});

// types is a direct API call
var types = importer.modifiedTime('types').then(function(result) {
  return importer.nrdb('/types', result);
}).then(function(json){
  var data = JSON.parse(json);
  var items = parser.types(data.data);
  return importer.save(items, 'types');
}).then(function(data) {
  return importer.markModified('types');
}).catch(err => {
  console.log('Error with types ' + err);
  return true;
});

// sets is a direct API call
var sets = importer.modifiedTime('sets').then(function(result) {
  return importer.nrdb('/packs', result);
}).then(function(json){
  var data = JSON.parse(json);
  var items = parser.sets(data.data);
  return importer.save(items, 'sets');
}).then(function(data) {
  return importer.markModified('sets');
}).catch(err => {
  console.log('Error with sets ' + err);
  return true;
});

// factions is a direct API call
var factions = importer.modifiedTime('factions').then(function(result) {
  return importer.nrdb('/factions', result);
}).then(function(json){
  var data = JSON.parse(json);
  var items = parser.factions(data.data);
  return importer.save(items, 'factions');
}).then(function(data) {
  return importer.markModified('factions');
}).catch(err => {
  console.log('Error with factions ' + err);
  return true;
});


Promise.all([cards, sets, factions]).then(function(){
  importer.wrapUp();
});