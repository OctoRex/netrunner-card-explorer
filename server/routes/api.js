var express = require('express'),
  router = express.Router(),
  connection = require('../modules/connection'),
  responses = require('../modules/responses');
  
/**
 *  Just return the modified time from the request to kick
 *  off our promises
 */
function getModifiedTime(req) {
  return new Promise((resolve, reject) => {
    if (req.get('If-Modified-Since')) {
      // change it to unix timestamp
      resolve(new Date(req.get('If-Modified-Since')).getTime());
    } else {
      resolve(0);
    }
  });
}

/**
 *  Get the last modified time from the DB and compare to that
 *  provided in the request (if there isn't one it will have be
 *  caught elsewhere
 */
function compareToModifiedtime(db, cacheTime, collection) {
  return new Promise((resolve, reject) => {
    // pull out the record from the DB
    db.collection('modified').findOne({'collection': collection}, (err, doc) => {
      if (err) reject('No modified time');
      resolve(doc.modified);
    });
  // compare the two times, we have to do this in here because
  // we need both variables and adding this 'then' outside
  // makes that a bit tricky
  }).then(function(modified) {
    if (modified > cacheTime) {
      throw {'modified': modified, 'message': 'Cached copy out of date'};
    }
    return {'modified': modified, 'message': 'Data not changed'};
  });
}

/**
 *  name the collection name you want and this will get it
 *  for you, simple, just wrapping it in a promise
 */
function getData(db, collectionName) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName).find({}, {"_id": 0}).toArray((err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
}

/**
 *  A wrapper for adding it to the router as they're all the same really
 */
function apiCall(router, db, endpoint, collection) {
  router.get(endpoint, function(req, res) {   
    getModifiedTime(req).then(result => {
      return compareToModifiedtime(db, result, collection);
    // if no new results then show the cache
    }).then(result => {
      responses.notModified(res);
    // if that fails or some reason, or the data is new then
    // show the data
    }).catch(reason => {      
      return getData(db, collection).then(docs => {
        
        // add the last modified header
        res.set('Last-Modified', new Date(reason.modified).toUTCString());
        responses.ok(res, docs);

      });
    }).catch(reason => {
      responses.error(res, reason);
    });
  });
}

connection.open()
  .then((db) => {
    apiCall(router, db, '/cards', 'cards');
    apiCall(router, db, '/factions', 'factions');
    apiCall(router, db, '/types', 'types');
    apiCall(router, db, '/subtypes', 'subtypes');
    apiCall(router, db, '/sets', 'sets');    
  })
  .catch((err) => console.error(err.message))

module.exports = router;
