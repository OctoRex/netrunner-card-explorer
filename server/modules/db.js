var mongojs = require('mongojs');
var db = mongojs('localhost/blackat');

module.exports = db;
