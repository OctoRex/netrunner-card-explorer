var db = require('./db');
var fs = require('fs');
var request = require('request');
var url = require('url');
var Promise = require('bluebird');
var http = require('http');
var https = require('https');

module.exports = {

// pull the data from NRDB, using modified time if present
  nrdb : function(url, modified) {

    var headers = {};
   
    // if we provide this header then NRDB will let us know when there's
    // no new data so we don't have to bother processing them
    if (modified) {
      headers['If-Modified-Since'] = new Date(modified).toUTCString();
    }
    
    var options = {
      url: 'https://netrunnerdb.com/api/2.0/public' + url,
      headers: headers
    };
    
    // return the request as a promise
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
  },

  images: function(cards) {

    var cardDir = __dirname + '/../../public/img/cards/';

    function localImgPath(card) {
      return cardDir + card.code + '.png';
    }

    function getProtocol(target_url) {
      var target_url = url.parse(target_url);
      return target_url.protocol === 'https:' ? https : http;
    }
    
    function hasImg(card) {
      return fs.existsSync(localImgPath(card));
    }

    function saveImg(card) {
      var file = fs.createWriteStream(localImgPath(card));
      var protocol = getProtocol(card.image_url);

      return new Promise(function(resolve, reject) {
        protocol.get(card.image_url, function(response) {
          response.pipe(file);
          resolve();
        }).on('error', function(err) {
          reject(err);
        })
      }).catch(function(err) {
        console.error(err);
      });;
    }

    return Promise.resolve(cards).each(function(card) {
      if (!hasImg(card)) {
        return saveImg(card);
      } else {
        return Promise.resolve();
      }
    }).then(function(){
      return cards;
    });
  },

  // abstract away the saving
  save : function(items, dataType) {
    console.log('Adding ' + dataType);
    var collection = db.collection(dataType);
    // drop the collection first, so we don't end up with duplicates
    collection.drop();
    items.forEach((element, index) => {
      collection.save(element);
    });
    return true;
  },

  // this needs to be separate as the cards run needs to only mark cards
  // as done once all 3 bits have been sorted
  markModified : function(dataType) {
    var modified = db.collection('modified');
    return modified.save({'collection': dataType, 'modified': Date.now()});
  },

  // get the last time they were modified (null if none) so that we can
  // save ourselves in import from NRDB
  modifiedTime : function(dataType) {
    var collection = db.collection('modified');
    return new Promise((resolve, reject) => {
      collection.findOne({collection: dataType}, function(err, doc) {
        // either way it resolves because neither is a fail
        if (doc && typeof doc.modified != 'undefined') {
          resolve(doc.modified);
        } else {
          resolve(null);
        }
      });
    });
  },
  
  wrapUp : function() {
    db.close();
  }
};