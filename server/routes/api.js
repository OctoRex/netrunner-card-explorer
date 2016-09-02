var express = require('express')
  , router = express.Router()
  , db = require('../modules/db');

function getModifiedTime(req) {
  return new Promise((resolve, reject) => {
    if (req.get('If-Modified-Since')) {
      resolve(new Date(req.get('If-Modified-Since')).getTime());
    } else {
      reject('Requires new data');
    }
  });
}

function compareToModifiedtime(cacheTime, collcetion) {
  return new Promise((resolve, reject) => {
    db.collection('modified').findOne({'collection': collcetion}, (err, doc) => {
      if (err) reject('No modified time');
      resolve(doc.modified);
    });
  }).then(function(modified) {
    if (modified > cacheTime) {
      throw 'Cached copy out of date';
    }
    return modified;
  });;
}

function getData(collectionName) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName).find((err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
}

function error(res, reason) {
  res.status(500).send('Problem with the server');
}

function ok(res, docs) {
  res.status(200).type('json').json(docs);
}

function notModified(res, result) {
  res.status(304).send();
}

function apiCall(router, endpoint, collection) {
  router.get(endpoint, function(req, res) {
    getModifiedTime(req).then(result => { 
      return compareToModifiedtime(result, collection);
    // if no new results then show the cache
    }).then(result => {
      notModified(res, result);
    // if that fails or some reason, or the data is new then
    // show the data
    }).catch(reason => { 
      return getData(collection).then(docs => {
        ok(res, docs);
      }).catch(reason => {
        error(res, reason);
      });
    })
  });
}

apiCall(router, '/cards', 'cards');
apiCall(router, '/factions', 'factions');
apiCall(router, '/types', 'types');
apiCall(router, '/subtypes', 'subtypes');
apiCall(router, '/sets', 'sets');

module.exports = router;
