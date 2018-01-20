var db = require('./modules/db');
var rimraf = require('rimraf');
var fs = require('fs');

var cardDir = __dirname + '/../public/img/cards';
var images = process.argv.slice(2);

db.collection('modified').drop((err, res) => {
  db.close();
  if (images != 'skipimages') {
    rimraf(cardDir, function() {
      if (!fs.existsSync(cardDir)){
        fs.mkdirSync(cardDir);
      }
    });
  }
});
