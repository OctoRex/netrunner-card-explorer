var db = require('./modules/db');

db.collection('modified').drop((err, res) => {
  db.close();
});